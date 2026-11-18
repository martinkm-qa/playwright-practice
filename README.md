# Playwright Practice

Личен проект за упражнения по TypeScript и Playwright.

## Структура

- `lectures/02-playwright/pages/` — локални HTML страници за упражнения.
- `lectures/02-playwright/tests/practice.spec.ts` —  1. **Interactions**

HTML примерите могат да се отварят директно в браузър. Те работят локално и не изпращат данни към сървър.

## Настройка

```bash
npm install
npx playwright install
```

## Стартиране на тестовете

```bash
npm test
```

За видим браузър:

```bash
npm test -- --headed
```
