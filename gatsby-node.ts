import path from "path";
import type { GatsbyNode } from "gatsby";

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
 * Why not rely on inference: reusable blocks (Heading, Cta, Faq, Card...) get
 * one stable type name, so components can declare GraphQL fragments on them
 * and typegen produces predictable TS types. Keep in sync with content.json.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  actions.createTypes(`
    # ---------- primitives ----------
    type Heading {
      text: String!
      "Part of the text that is visually accented in the design (may be empty)"
      highlight: String
    }

    type LinkItem {
      label: String!
      path: String!
    }

    type Seo {
      title: String!
      description: String
    }

    type SectionIntro {
      title: Heading!
      description: String
    }

    type Card {
      title: String!
      description: String!
      "Icon name from src/components/ui/icons.tsx"
      icon: String
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
      type: String!
      label: String!
      href: String
      icon: String!
    }

    type SocialLink {
      label: String!
      href: String!
      icon: String!
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
      logoutLabel: String!
    }

    type Layout {
      brand: String!
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
      title: Heading!
      description: String!
      button: LinkItem!
    }

    type Shared {
      faq: Faq!
      testimonials: Testimonials!
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
      title: Heading!
      description: String!
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
      icon: String!
    }

    type HomeHero {
      badge: String!
      title: Heading!
      description: String!
      button: LinkItem!
      widget: HeroWidget!
    }

    type UseCase {
      title: String!
      icon: String!
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
      image: String!
    }

    type MissionVision {
      intro: SectionIntro!
      items: [MissionVisionItem!]!
    }

    type PressRelease {
      title: String!
      image: String!
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
      name: String!
      type: String!
      placeholder: String!
      autoComplete: String!
    }

    type AuthForm {
      title: Heading!
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
      icon: String!
    }

    type AuthPage {
      seo: Seo!
      form: AuthForm!
    }

    # ---------- 404 ----------
    type NotFound {
      code: String!
      title: Heading!
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
      image: String!
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
      hero: GuideHero!
      colors: ColorStyles!
      typography: TypographyGuide!
      assets: AssetsGuide!
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
    }

    # ---------- root node (src/data/content.json) ----------
    type ContentJson implements Node @dontInfer {
      layout: Layout!
      shared: Shared!
      pages: Pages!
    }
  `);
};
