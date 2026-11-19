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
    hooks/                 — useCollapsibleList, useScrollActiveIntoView, useBooleanState…
    utils/                 — cn, getClassNameByMods, getContactHref, getIsExternalLink, getIconName, mapValues…
    types/                 — общие типы (TWithClassName, TWithPropsMods, TMaybe…)
    tabs/                  — модуль: хук + утилиты + типы одного виджета вместе (useTabs, getTabId…), API в index.ts
  styles/                  — глобальные стили, токены, миксины, типографика, декор
  images/                  — content/ — картинки контента (через gatsby-plugin-image), decor/ — фоны для SCSS, icons/
static/                    — файлы «как есть»: favicon
```

### Компонент

Каждый компонент — папка: `X.tsx`, `X.scss`, `index.ts`, при необходимости `X.graphql.ts` (фрагмент).
Наружу компоненты отдаются через barrel-файлы (`@components/ui`, `@components/content`…).
Подкомпоненты секции (`JobCard`, `ColorGroup`) импортируются относительно и в barrel не попадают.

### Алиасы импортов

`@components/*`, `@box/*`, `@features/*`, `@data/*`, `@images/*`, `@styles/*`.

В `box` код разложен по типу (`hooks`, `utils`, `constants`, `types`). Исключение — модуль: если у UI-виджета набирается
своя связка хук + утилиты + типы, она живёт в `box/<имя>/` с публичным API в `index.ts` (`@box/tabs`).
Предметная логика (пользователи, сессия) — не в `box`, а в `features`.
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
- Иконки в данных — ключи `ICON_NAMES` (`"icon": "arrowUpRight"`). Перечислимые значения из `content.json`
  (иконки, `Contact.type`, `FormField.name`) объявлены в схеме как GraphQL-enum из констант (`ICON_NAMES`, `CONTACT_TYPES`,
  `AUTH_FIELDS`): typegen даёт union-типы, а опечатка роняет запрос — `develop` / `build` останавливается.
  В компонентах — `getIconName(icon)` (ключ → имя иконки в `ICONS`).
- Иконки — по одному `.svg` на иконку в `src/images/icons/` (имя файла в kebab-case = имя иконки).
  `scripts/generate-icons.mjs` собирает из них `ICON_NAMES` (`box/constants/icons.ts`) и `ICONS`
  (`components/ui/Icon/icons.tsx`) — эти два файла генерируются, руками не правятся. Скрипт переводит атрибуты в JSX
  (`fill-rule` → `fillRule`), добавляет к `id` префикс с именем иконки, запускается перед `develop` / `start` / `build`.
  **Новая иконка = положить `.svg` в папку и перезапустить проект.** Основной цвет в SVG — `currentColor`.
- Картинки контента — в `src/images/content/`, в `content.json` путь относительно него: `"image": "../images/content/heroes/about.webp"`.
  В схеме поле объявлено как `File! @fileByRelativePath`, во фрагменте — `childImageSharp { gatsbyImageData(sizes: …) }`:
  `sizes` = ширина картинки в макете, по ней браузер выбирает файл из `srcset` с учётом плотности экрана.
  Sharp на сборке делает варианты по ширине в webp / avif. Тип пропа — `TContentImage`, вывод — `ZoomImage` / `GatsbyImage`.
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
  Контентные фото — `ZoomImage` (обёртка над `GatsbyImage`).

### TypeScript / React

- Порядок пропсов: `key` (проверяет ESLint, локальное правило `eslint/jsx-key-first.mjs`), `id`, `className`, затем остальное. Булевы пропсы — `is…`, булевы утилиты — `getIs…`.
- Константы — `UPPER_SNAKE` с camelCase-ключами: `ARIA_LABELS.burgerBtn.open`, `ICON_NAMES.arrowLeft`.
  В коде никаких строковых литералов там, где есть константа (иконки, aria-label, модификаторы, регулярки).
- Типы — с префиксом `T` и, где можно, выводятся из источника: `Queries.*` из GraphQL, `typeof COMPONENT_MODS.button`.
  Общие типы — в `box/types` (у модулей и фич — свой `types.ts`), в файлах компонентов и констант — только локальные `Props`.
- Все комментарии — JSDoc `/** */`, в JSX — `{/** */}`.
- Пропсы, которые один в один уходят в атрибут элемента, берутся из нативных типов:
  `Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">`, `Pick<AriaAttributes, "aria-label">`. Доменные колбэки (`onLogout`) — свои.
- Без `as` поверх чужих данных: `localStorage` — через type guard (`getIsAuthUser`). Включён `noUncheckedIndexedAccess`
  (`arr[i]` — `T | undefined`). CSS-переменные в `style` — без каста (`box/types/css.d.ts`).
- Импорты группируются автоматически (ESLint, `eslint.config.mjs`), пустая строка между группами:
  пакеты → `@images` → компоненты (layout → ui → content → sections → `./X`) → `@box` (hooks → utils → constants → types → модули),
  `@features` → стили (сначала пакетов, потом свои `./X.scss`).

## Авторизация (демо)

`features/auth` — регистрация и вход без бэкенда: пользователи и сессия в `localStorage`, подписка через
`useSyncExternalStore` (`useAuth`). В шапке залогиненного — инициалы и Logout; со страниц `/login/` и `/sign-up/`
залогиненного перенаправляет на главную. **Пароли хранятся открытым текстом — это только демо.**

## Доступность и UX

- Семантика: `section` / `article` / `header` / `address` / `dl`, landmark-навигации с разными `aria-label`.
- **Клавиатура.** Фокус виден только с клавиатуры (`:focus-visible`, токены `--focus-ring` / `--focus-ring-offset`).
  Первая ссылка — «Skip to content» (`SkipLink`) на `<main id="main-content" tabindex="-1">`.
  `scroll-padding-top` (`--sticky-header-offset`) не даёт фокусу и якорям уходить под липкую шапку.
- **Табы** (`@box/tabs`, паттерн WAI-ARIA): вкладки и панель связаны id из `useId()` (`aria-controls` / `aria-labelledby`),
  в Tab-порядке только активная вкладка, ←→↑↓ / Home / End переключают, Tab ведёт в панель.
  `role="tabpanel"` — на обёртке, список внутри остаётся списком.
- **Мобильное меню** (`useMobileMenu`): `aria-expanded` / `aria-controls`; пока открыто — фокус на первой ссылке, остальная страница
  `inert` (`useInertOutside`) и не прокручивается; Escape закрывает и возвращает фокус на бургер, клик вне шапки — закрывает
  (`useClickOutside`).
- **«Load All» в FAQ** (`useCollapsibleList`): `aria-controls` на список, после раскрытия фокус — на первый новый вопрос.
- **Формы:** своя проверка при отправке вместо браузерной (`noValidate`, `getAuthFormErrors` в `features/auth`):
  сообщение под каждым неверным полем, фокус на первое из них, ошибка поля сбрасывается при вводе. Поля связаны с ошибками
  через `aria-invalid` / `aria-describedby`, общая ошибка входа — `role="alert"`; переключатель пароля с `aria-pressed`.
- **Фото контента:** `alt` обязателен (`TContentImageProps`); `imageAlt` в `content.json` — для фото со смыслом,
  без него `alt=""` (декоративное: смысл несёт текст рядом).
- **`prefers-reduced-motion`:** `--transition` обнуляется (миксин `reduced-motion` в `global.scss`) — все переходы
  мгновенные, поэтому переходы пишутся только через `var(--transition)`. Без зума картинок, Swiper — `speed` 0
  (`MEDIA_QUERIES.reducedMotion`), прокрутка из JS — без плавности (`getScrollBehavior`).
- Внешние ссылки открываются в новой вкладке с `rel="noopener noreferrer"`.

## Деплой

`.github/workflows/deploy.yml`: на каждый push в `main` — `npm ci` → ESLint + Stylelint → `build:gh-pages` → GitHub Pages
(в настройках репозитория Pages → Source: **GitHub Actions**).

- Сайт живёт в подпапке `/your-bank` (`pathPrefix` в `gatsby-config.ts`). Пути, записанные строкой
  (картинки из `content.json`, favicon), оборачиваются в `withPrefix()`; импортированные ассеты получают префикс сами.
- Переименовали репозиторий — поменяйте `pathPrefix`.
