# YourBank — Gatsby

Сайт банка по макету [YourBank – Bank Website Dark Theme (Figma)](https://www.figma.com/design/YUPVscHPBcWGIYfdrftEQs).

**Демо:** https://pavelfedorov2000.github.io/your-bank/

Gatsby 5 · React 18 · TypeScript · SCSS (BEM) · GraphQL · Swiper · ESLint + Stylelint · GitHub Actions → GitHub Pages

## Запуск

Нужна Node.js **22** (`>=22.22.2` — требование Stylelint 18).

```shell
npm ci
npm run develop          # http://localhost:8000, GraphiQL: /___graphql (перед стартом сортирует импорты)
npm run build            # продакшен-сборка в public/
npm run serve            # раздать public/ локально

npm run build:gh-pages   # сборка с префиксом /your-bank (как на GitHub Pages)
npm run serve:gh-pages   # проверить её локально: http://localhost:9000/your-bank/

npm run icons            # пересобрать набор иконок из src/images/icons (запускается и перед develop / build)
npm run typecheck        # tsc (нужен сгенерированный src/gatsby-types.d.ts — создаётся при develop)
npm run lint             # ESLint (порядок импортов);  lint:fix — исправить
npm run lint:styles      # Stylelint (порядок свойств); lint:styles:fix — исправить
```

> В `develop` неизвестный URL показывает служебную 404 Gatsby (кнопка «Preview custom 404 page»).
> В сборке на любой неизвестный путь отдаётся наша `404.html` со статусом 404.

## Страницы

| Путь         | Файл                | Секции                                                       |
|--------------|---------------------|--------------------------------------------------------------|
| `/`          | `pages/index.tsx`   | Hero, Products, Use Cases, Features, FAQ, Testimonials, CTA  |
| `/careers/`  | `pages/careers.tsx` | Hero, Values, Benefits, Job Openings, FAQ, CTA               |
| `/about/`    | `pages/about.tsx`   | Hero, Mission & Vision, Press Releases                       |
| `/security/` | `pages/security.tsx`| Hero, How We Protect You, FAQ                                |
| `/login/`    | `pages/login.tsx`   | Login form, Testimonials                                     |
| `/sign-up/`  | `pages/sign-up.tsx` | Sign Up form, Testimonials                                   |
| `/guide/`    | `pages/guide.tsx`   | Дизайн-гайд: цвета, типографика, ассеты (Figma «🚀 Guide»)   |
| `404`        | `pages/404.tsx`     | Своя страница (в макете не отрисована)                       |

Брейкпоинты из макета: Mobile 390, Laptop 1440, Desktop 1920. Отдельного макета для планшета нет —
с 768 раскладка переходит в «ноутбучную», где это читается лучше, некоторые сетки остаются в одну колонку до 1440.

## Структура

```
src/
  data/content.json        — все тексты сайта
  pages/                   — роуты + page queries (собираются из фрагментов секций)
  components/
    ui/                    — «глупые» примитивы без GraphQL: Button, Card, List, Tabs, Title, Icon, IconBadge, Input…
    content/               — переиспользуемые блоки с данными: TextBlock, IconTextBlock, SectionIntro, BenefitCard, Seo…
    layout/                — каркас: Layout, Header, Footer, Container, Section
    sections/              — секции страниц, плоско (не привязаны к странице); части секции — внутри её папки
  features/auth/           — фейковая авторизация (localStorage): хранилище, хуки, утилиты, публичный API в index.ts
  box/
    constants/             — COMPONENT_MODS, GENERAL_MODS, ICON_NAMES, ARIA_LABELS, REG_EXP_PATTERNS…
    hooks/                 — useTabs, useCollapsibleList, useScrollActiveIntoView, useBooleanState…
    utils/                 — cn, getClassNameByMods, getContactHref, getIsExternalLink, getIconName…
    types/                 — общие типы (TWithClassName, TWithPropsMods, TMaybe…)
  styles/                  — глобальные стили, токены, миксины, типографика, декор
  images/                  — картинки, импортируемые в код / SCSS (decor/ — декоративные фоны)
static/                    — файлы «как есть»: favicon, картинки контента из content.json
```

### Компонент

Каждый компонент — папка: `X.tsx`, `X.scss`, `index.ts`, при необходимости `X.graphql.ts` (фрагмент).
Наружу компоненты отдаются через barrel-файлы (`@components/ui`, `@components/content`…).
Подкомпоненты секции (`JobCard`, `ColorGroup`) импортируются относительно и в barrel не попадают.

### Алиасы импортов

`@components/*`, `@box/*`, `@features/*`, `@data/*`, `@images/*`, `@styles/*`.
Заданы в двух местах — `tsconfig.json` (`paths`) и `gatsby-node.ts` (`ALIASES`), держите их синхронными.
В `gatsby-config.ts` / `gatsby-node.ts` алиасы не работают — там относительные импорты (`./src/box/constants/…`).

## Данные

Все тексты лежат в `src/data/content.json`:

```
layout   — бренд, навигация, auth-кнопки, футер (через useStaticQuery в useLayoutContent)
shared   — блоки нескольких страниц: faq, testimonials
pages    — home / careers / about / security / login / signUp / notFound / guide
```

- Схема GraphQL описана явно в `gatsby-node.ts` (`createSchemaCustomization`) — у переиспользуемых блоков стабильные типы.
  **Меняете структуру JSON — обновите схему.**
- Фрагмент лежит рядом с компонентом (`FaqSection.graphql.ts` → `...FaqSection`), страница собирает из них page query,
  компонент получает `data`, тип пропа (`Queries.FaqSectionFragment`) генерирует `graphqlTypegen`.
- Выделение в заголовках — тег `<mark>` прямо в тексте: `"title": "Our <mark>Products</mark>"`.
  `Title` выводит его через проп `html` (`dangerouslySetInnerHTML`) — только для своего контента, не для пользовательского ввода.
- Иконки в данных — строки (`"icon": "mail"`). При старте `develop` / `build` они сверяются с `ICON_NAMES`
  (`onPreBootstrap` в `gatsby-node.ts`): опечатка останавливает сборку. В компонентах — `getIconName(icon)`.
- Иконки — по одному `.svg` на иконку в `src/images/icons/` (имя файла в kebab-case = имя иконки).
  `scripts/generate-icons.mjs` собирает из них `ICON_NAMES` (`box/constants/icons.ts`) и `ICONS`
  (`components/ui/Icon/icons.tsx`) — эти два файла генерируются, руками не правятся. Скрипт переводит атрибуты в JSX
  (`fill-rule` → `fillRule`), добавляет к `id` префикс с именем иконки, запускается перед `develop` / `start` / `build`.
  **Новая иконка = положить `.svg` в папку и перезапустить проект.** Основной цвет в SVG — `currentColor`.
- Ссылки контактов не хранятся: `mailto:` / `tel:` строятся из текста (`getContactHref`).

## Конвенции

### BEM и модификаторы

- В TSX — `const mainClass = "block";`, элементы `${mainClass}__element`. В SCSS — `$name: ".block";`.
- Модификаторы — только через константы и `getClassNameByMods`, никаких строк `--x` в разметке:

  ```tsx
  <Button mods={[COMPONENT_MODS.button.primary, COMPONENT_MODS.button.small]} />
  <List mods={[COMPONENT_MODS.list.twoColumns]} />
  ```

  - `COMPONENT_MODS` (`box/constants/component-mods.ts`) — модификаторы компонентов: `button`, `card`, `iconBadge`,
    `iconTextBlock`, `list`, `navMenu`, `section`, `tabs`.
  - `GENERAL_MODS` — общие состояния и направления: `open`, `prev`, `next`, `reversed`, `light`.
- Состояния — через ARIA, а не классы: `[aria-selected="true"]`, `[aria-current="page"]`, `aria-expanded`.
- Блок настраивается **CSS-переменными**, а не перебиванием свойств. Блок, подмешанный через `className` (mix),
  задаёт только переменные чужого блока (`--card-padding`, `--list-gap`, `--text-block-gap`, `--icon-text-block-gap`…).
  Значения по умолчанию — в `:root` файла блока. `--list-*` зарегистрированы через `@property` с `inherits: false`,
  чтобы вложенный список не наследовал настройки родительского.

### SCSS

- Порядок внутри правила (проверяет Stylelint, `stylelint.config.mjs` + `stylelint/`):
  1. CSS-переменные, 2. SCSS-переменные,
  3. свойства по группам: content → flex/grid → позиционирование → блочная модель → типографика → оформление → анимация → разное,
  4. `@include responsive(…)` — **всегда внизу**, в том же порядке групп (переменные первыми),
  5. вложенные правила.
- `responsive(prop, (mobile, sm, lg, xxl))` — значение по брейкпоинту, `null` пропускает брейкпоинт.
  Для одного значения пишите обычное свойство. Для CSS-переменной первым значением не ставьте `null` —
  получится пустое `--x: ;`.
- `hover-fine-pointer($modifier)` — ховеры только для мыши/тачпада: `@media (hover: hover) and (pointer: fine)`.
- `fluid($min, $max, $from, $to)` — плавное значение между двумя кадрами макета через `clamp()`.
- Токены — в `styles/global.scss`: цвета (в т. ч. `--color-grey-20/30/40` из гайда и `--color-*-rgb` для прозрачности:
  `rgb(var(--color-accent-rgb) / 0.2)`), `--radius-*`, `--transition`, `--sections-gap`, `--cards-gap`.
- Типографика — миксины `styles/_typography.scss` (`text-title`, `text-subtitle`, `text-card-title`, `text-body`, `text-description`).
- Декоративные картинки — фоном в `::before` / `::after` с `aspect-ratio`, не `<img>`.
  Общие поверхности — `styles/_decor.scss`: `noise-surface` (зерно + градиенты из Figma), `image-border` (градиентная рамка).
  Контентные фото — `ZoomImage`.

### TypeScript / React

- Порядок пропсов: `id`, затем `className`, затем остальное. Булевы пропсы — `is…`, булевы утилиты — `getIs…`.
- Константы — `UPPER_SNAKE` с camelCase-ключами: `ARIA_LABELS.burgerBtn.open`, `ICON_NAMES.arrowLeft`.
  В коде никаких строковых литералов там, где есть константа (иконки, aria-label, модификаторы, регулярки).
- Типы — с префиксом `T` и, где можно, выводятся из источника: `Queries.*` из GraphQL, `typeof COMPONENT_MODS.button`.
- Все комментарии — JSDoc `/** */`, в JSX — `{/** */}`.
- Импорты группируются автоматически (ESLint, `eslint.config.mjs`), пустая строка между группами:
  пакеты → `@images` → компоненты (layout → ui → content → sections → `./X`) → `@box` (hooks → utils → constants → types),
  `@features` → стили (сначала пакетов, потом свои `./X.scss`).

## Авторизация (демо)

`features/auth` — регистрация и вход без бэкенда: пользователи и сессия в `localStorage`, подписка через
`useSyncExternalStore` (`useAuth`). В шапке залогиненного — инициалы и Logout; со страниц `/login/` и `/sign-up/`
залогиненного перенаправляет на главную. **Пароли хранятся открытым текстом — это только демо.**

## Доступность и UX

- Семантика: `section` / `article` / `header` / `address` / `dl`, landmark-навигации с разными `aria-label`, `role="tablist"` / `tabpanel`.
- Бургер-меню с `aria-expanded` / `aria-controls`, переключатель пароля с `aria-pressed`, ошибки формы с `role="alert"`.
- Активный таб в горизонтально прокручиваемом ряду подкручивается в зону видимости (`useScrollActiveIntoView`),
  с учётом `prefers-reduced-motion`.
- Внешние ссылки открываются в новой вкладке с `rel="noopener noreferrer"`.

## Деплой

`.github/workflows/deploy.yml`: на каждый push в `main` — `npm ci` → ESLint + Stylelint → `build:gh-pages` → GitHub Pages
(в настройках репозитория Pages → Source: **GitHub Actions**).

- Сайт живёт в подпапке `/your-bank` (`pathPrefix` в `gatsby-config.ts`). Пути, записанные строкой
  (картинки из `content.json`, favicon), оборачиваются в `withPrefix()`; импортированные ассеты получают префикс сами.
- Переименовали репозиторий — поменяйте `pathPrefix`.
