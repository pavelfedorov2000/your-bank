# YourBank — Gatsby

Сайт по макету [YourBank – Bank Website Dark Theme (Figma)](https://www.figma.com/design/YUPVscHPBcWGIYfdrftEQs).

```shell
npm install
npm run develop   # http://localhost:8000, GraphiQL: http://localhost:8000/___graphql
npm run build
npm run typecheck # после develop/build (нужен сгенерированный src/gatsby-types.d.ts)
```

## Роутинг

Файловый роутинг Gatsby (`src/pages`), страницы = фреймы макета:

| Путь         | Файл                    | Секции (по порядку в макете)                                   |
|--------------|-------------------------|----------------------------------------------------------------|
| `/`          | `pages/index.tsx`       | Hero, Products, Use Cases, Features, FAQ, Testimonials, CTA    |
| `/careers/`  | `pages/careers.tsx`     | Hero, Values, Benefits, Job Openings, FAQ, CTA                 |
| `/about/`    | `pages/about.tsx`       | Hero, Mission & Vision, Press Releases                         |
| `/security/` | `pages/security.tsx`    | Hero, How We Protect You, FAQ                                  |
| `/login/`    | `pages/login.tsx`       | Login form, Testimonials                                       |
| `/sign-up/`  | `pages/sign-up.tsx`     | Sign Up form, Testimonials                                     |
| `/404/`      | `pages/404.tsx`         | —                                                              |

Navbar и Footer общие, они в `components/layout/Layout.tsx`.

## Данные

Все тексты с макета лежат в `src/data/content.json`:

```
layout   — бренд, навигация, кнопки Sign Up / Login, футер (используется через useStaticQuery)
shared   — блоки, повторяющиеся на нескольких страницах: faq, testimonials
pages    — home / careers / about / security / login / signUp / notFound
```

`gatsby-source-filesystem` + `gatsby-transformer-json` создают из файла узел `ContentJson`.
Схема описана явно в `gatsby-node.ts` (`createSchemaCustomization`), чтобы у переиспользуемых блоков
(`Heading`, `Cta`, `Faq`, `IntroWithCards`…) были стабильные GraphQL-типы. **При изменении структуры JSON обновляйте схему.**

`Heading.highlight` — это часть заголовка, которая в макете выделена акцентным цветом. `Heading` рендерит её в `<mark>`.

## Структура

```
src/
  data/content.json        — контент
  pages/                   — роуты + page queries (собираются из фрагментов секций)
  components/
    layout/                — каркас: Layout, Header, Footer, Container…
    ui/                    — примитивы без GraphQL: Button, Tabs, List, Icon, Badge…
    content/               — блоки, привязанные к фрагментам контента: Heading, SectionIntro; fragments.graphql.ts — общие фрагменты LinkItem/Card/Stat/MetaItem
    sections/              — секции страниц, плоско (не привязаны к страницам); части секции лежат внутри её папки
    Seo/                   — используется в `export const Head` страниц
  box/                     — constants, hooks, utils, types (импорт через барелы: `@box/utils` и т.д.)
```

Фрагмент компонента лежит рядом с ним в `X.graphql.ts` (например, `FaqSection.graphql.ts` → `...FaqSection`). Страница собирает из них page query, а данные
передаются в компонент через проп `data`. Тип пропа (`Queries.FaqSectionFragment`) генерирует `graphqlTypegen`.

Стилей пока нет, только семантическая разметка.

## Алиасы импортов

`@components/*` (`@components/ui`, `@components/sections`…), `@box/*` (`@box/constants`, `@box/hooks`, `@box/utils`, `@box/types`), `@data/*`, `@images/*`, `@styles/*`.
Заданы в двух местах — `tsconfig.json` (`paths`, для TS/IDE) и `gatsby-node.ts` (`onCreateWebpackConfig`, для сборки) — держите их синхронными.
Импорты соседних файлов из той же папки остаются относительными (`./Heading`).
