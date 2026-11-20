import path from "path";
import type { GatsbyNode } from "gatsby";

import { CONTACT_TYPES } from "./src/box/constants/contacts";
import { ICON_NAMES } from "./src/box/constants/icons";
import { AUTH_FIELDS } from "./src/features/auth/constants";

/** Import aliases (`@components/ui`, `@box/utils`). Keep in sync with "paths" in tsconfig.json. */
const ALIASES: Record<string, string> = {
  "@components": "src/components",
  "@data": "src/data",
  "@images": "src/images",
  "@styles": "src/styles",
  /** constants, hooks, utils, types: import from "@box/constants" etc. */
  "@box": "src/box",
  /** Self-contained features (logic + hooks + types): import from "@features/auth" */
  "@features": "src/features"
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, getConfig }) => {
  const config = getConfig();

  config.resolve.alias = {
    ...config.resolve.alias,
    ...Object.fromEntries(Object.entries(ALIASES).map(([alias, dir]) => [alias, path.resolve(process.cwd(), dir)]))
  };

  /**
   * Styles are plain global BEM classes (unique per block), so the order in which components import them
   * doesn't matter: silence mini-css-extract-plugin "Conflicting order" warnings.
   */
  const miniCssExtract = config.plugins?.find(
    (plugin: { constructor?: { name?: string } }) => plugin?.constructor?.name === "MiniCssExtractPlugin"
  );
  if (miniCssExtract) {
    miniCssExtract.options.ignoreOrder = true;
  }

  actions.replaceWebpackConfig(config);
};

/**
 * Explicit GraphQL schema for src/data/content.json.
 *
 * Why not rely on inference: reusable blocks (SectionIntro, Cta, Faq, Card...) get
 * one stable type name, so components can declare GraphQL fragments on them
 * and typegen produces predictable TS types. Keep in sync with content.json.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  /**
   * GraphQL enums from the constants' keys: typegen turns them into unions (Queries.IconName…),
   * and an unknown value in content.json fails the query, so `develop` / `build` stops on a typo.
   */
  const getEnumSdl = (name: string, constant: Record<string, string>) => `enum ${name} { ${Object.keys(constant).join(" ")} }`;

  actions.createTypes([
    getEnumSdl("IconName", ICON_NAMES),
    getEnumSdl("ContactType", CONTACT_TYPES),
    getEnumSdl("AuthFieldName", AUTH_FIELDS),
  ]);

  actions.createTypes(`
    # ---------- primitives ----------
    # Images: path relative to content.json ("../images/content/…"), resolved to a File for gatsby-plugin-image.
    # Titles are plain strings; the accented part (lime in the design) is wrapped in <mark>: "Our <mark>Products</mark>"

    type LinkItem {
      label: String!
      path: String!
    }

    type Seo {
      title: String!
      description: String
    }

    type SectionIntro {
      title: String!
      description: String
    }

    type Card {
      title: String!
      description: String!
      icon: IconName
    }

    type Stat {
      value: String!
      label: String!
    }

    type MetaItem {
      label: String!
      value: String!
    }

    # ---------- layout ----------
    type Contact {
      "The link (mailto: / tel:) is built from the label"
      type: ContactType!
      label: String!
      icon: IconName!
    }

    type SocialLink {
      label: String!
      href: String!
      icon: IconName!
    }

    type Footer {
      contacts: [Contact!]!
      socials: [SocialLink!]!
      copyright: String!
      legalLinks: [LinkItem!]!
    }

    type Auth {
      signUp: LinkItem!
      login: LinkItem!
      logoutBtnText: String!
    }

    type Layout {
      brand: String!
      "First link in the Tab order: jumps over the header to <main>"
      skipLinkText: String!
      navigation: [LinkItem!]!
      auth: Auth!
      footer: Footer!
    }

    # ---------- shared sections ----------
    type FaqItem {
      question: String!
      answer: String!
    }

    type Faq {
      intro: SectionIntro!
      items: [FaqItem!]!
      loadMoreButtonText: String!
    }

    type Testimonial {
      quote: String!
      author: String!
    }

    type TestimonialsTab {
      label: String!
      items: [Testimonial!]!
    }

    type Testimonials {
      intro: SectionIntro!
      tabs: [TestimonialsTab!]!
    }

    type Cta {
      title: String!
      description: String!
      button: LinkItem!
    }

    type Shared {
      faq: Faq!
      testimonials: Testimonials!
      "Banner of the template pages (guide, sitemap)"
      templateHero: GuideHero!
    }

    type IntroWithCards {
      intro: SectionIntro!
      items: [Card!]!
    }

    "One tab of a tabbed section: its label and its own content"
    type CardsTab {
      label: String!
      items: [Card!]!
    }

    type TabbedCards {
      intro: SectionIntro!
      tabs: [CardsTab!]!
    }

    type SimpleHero {
      supTitle: String
      title: String!
      description: String!
      image: File! @fileByRelativePath
      "Text alternative of a meaningful photo; without it the photo is decorative (empty alt)"
      imageAlt: String
    }

    # ---------- home ----------
    type Transaction {
      label: String!
      name: String!
      amount: String!
    }

    type CurrencyAmount {
      code: String!
      name: String!
      amount: String!
    }

    type Exchange {
      title: String!
      from: CurrencyAmount!
      to: CurrencyAmount!
      buttonLabel: String!
    }

    type Transactions {
      title: String!
      list: [Transaction!]!
    }

    type SupportedCurrencies {
      label: String!
      list: [SupportedCurrency!]!
    }

    type HeroWidget {
      income: Stat!
      transactions: Transactions!
      exchange: Exchange!
      supportedCurrencies: SupportedCurrencies!
    }

    type SupportedCurrency {
      code: String!
      icon: IconName!
    }

    type HomeHero {
      badge: String!
      title: String!
      description: String!
      button: LinkItem!
      widget: HeroWidget!
    }

    type UseCase {
      title: String!
      icon: IconName!
    }

    type UseCaseGroup {
      audience: String!
      title: String!
      description: String!
      cases: [UseCase!]!
      stats: [Stat!]!
      button: LinkItem!
    }

    type UseCases {
      intro: SectionIntro!
      groups: [UseCaseGroup!]!
    }

    type HomePage {
      seo: Seo!
      hero: HomeHero!
      products: TabbedCards!
      useCases: UseCases!
      features: TabbedCards!
      cta: Cta!
    }

    # ---------- careers ----------
    type Job {
      title: String!
      meta: [MetaItem!]!
      about: String!
      requirements: [String!]!
      button: LinkItem!
    }

    type Jobs {
      intro: SectionIntro!
      aboutLabel: String!
      requirementsLabel: String!
      items: [Job!]!
    }

    type CareersPage {
      seo: Seo!
      hero: SimpleHero!
      values: IntroWithCards!
      benefits: IntroWithCards!
      jobs: Jobs!
      cta: Cta!
    }

    # ---------- about ----------
    type MissionVisionItem {
      title: String!
      description: String!
      image: File! @fileByRelativePath
      "Text alternative of a meaningful photo; without it the photo is decorative (empty alt)"
      imageAlt: String
    }

    type MissionVision {
      intro: SectionIntro!
      items: [MissionVisionItem!]!
    }

    type PressRelease {
      title: String!
      image: File! @fileByRelativePath
      "Text alternative of a meaningful photo; without it the photo is decorative (empty alt)"
      imageAlt: String
      meta: [MetaItem!]!
      description: String!
    }

    type PressReleases {
      intro: SectionIntro!
      items: [PressRelease!]!
    }

    type AboutPage {
      seo: Seo!
      hero: SimpleHero!
      missionVision: MissionVision!
      pressReleases: PressReleases!
    }

    # ---------- security ----------
    type SecurityPage {
      seo: Seo!
      hero: SimpleHero!
      protection: IntroWithCards!
    }

    # ---------- auth pages ----------
    type FormField {
      name: AuthFieldName!
      type: String!
      placeholder: String!
      autoComplete: String!
    }

    type AuthForm {
      title: String!
      description: String!
      fields: [FormField!]!
      forgotPasswordLabel: String
      submitLabel: String!
      secondaryButton: LinkItem!
      socialLabel: String!
      socialProviders: [SocialProvider!]!
    }

    type SocialProvider {
      name: String!
      icon: IconName!
    }

    type AuthPage {
      seo: Seo!
      form: AuthForm!
    }

    # ---------- 404 ----------
    type NotFound {
      code: String!
      title: String!
      description: String!
      button: LinkItem!
      secondaryButton: LinkItem!
    }

    type NotFoundPage {
      seo: Seo!
      content: NotFound!
    }

    # ---------- design guide ----------
    type GuideHero {
      title: String!
      description: String!
      author: LinkItem!
    }

    type ColorSwatch {
      name: String!
      hex: String!
    }

    type ColorGroup {
      title: String!
      description: String!
      "Swatches per row from tablet up (mobile: 2)"
      columns: Int!
      swatches: [ColorSwatch!]!
    }

    type ColorStyles {
      intro: SectionIntro!
      groups: [ColorGroup!]!
    }

    type FontWeight {
      label: String!
      value: Int!
    }

    type Charset {
      title: String!
      characters: String!
    }

    type TypographyGuide {
      intro: SectionIntro!
      fontName: String!
      weightsTitle: String!
      weights: [FontWeight!]!
      charsets: [Charset!]!
    }

    type LogoVariant {
      label: String!
      width: Int!
    }

    type AbstractDesign {
      image: File! @fileByRelativePath
      alt: String!
    }

    type AssetsGuide {
      intro: SectionIntro!
      logoTitle: String!
      logoVariants: [LogoVariant!]!
      abstractTitle: String!
      abstractDesigns: [AbstractDesign!]!
    }

    type GuidePage {
      seo: Seo!
      colors: ColorStyles!
      typography: TypographyGuide!
      assets: AssetsGuide!
    }

    # ---------- sitemap ----------
    "One page of the template: link to it + its sections from top to bottom"
    type SitemapTree {
      page: LinkItem!
      sections: [String!]!
    }

    type Sitemap {
      intro: SectionIntro!
      trees: [SitemapTree!]!
    }

    type SitemapPage {
      seo: Seo!
      sitemap: Sitemap!
    }

    type Pages {
      home: HomePage!
      careers: CareersPage!
      about: AboutPage!
      security: SecurityPage!
      login: AuthPage!
      signUp: AuthPage!
      notFound: NotFoundPage!
      guide: GuidePage!
      sitemap: SitemapPage!
    }

    # ---------- root node (src/data/content.json) ----------
    type ContentJson implements Node @dontInfer {
      layout: Layout!
      shared: Shared!
      pages: Pages!
    }
  `);
};
