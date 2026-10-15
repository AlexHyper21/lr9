# ЛР 9 — Unit- и E2E-тесты

Клиент интернет-магазина «пиксельмаркет» (вариант 3): React + Redux Toolkit + React Bootstrap + React Router. Товары загружаются из API ЛР 8 (`/api/products`, проксируется Vite на `http://localhost:5000`).

## Запуск приложения

```bash
npm install
npm run dev
```

http://localhost:5173 (для реальных данных должен работать сервер из ЛР 8).

## Unit-тесты (Jest + React Testing Library)

```bash
npm test
```

| Файл | Что проверяется |
|---|---|
| `src/store/cartSlice.test.js` | редюсер корзины: добавление товара, увеличение количества, иммутабельность, удаление, селекторы |
| `src/components/QuantitySelector/QuantitySelector.test.jsx` | счётчик не может стать меньше 1 |
| `src/pages/CatalogPage.test.jsx` | вывод товаров из замоканного API (`jest.mock`), добавление в store, ошибка загрузки |

## E2E-тест (Playwright)

Один раз установить браузер:

```bash
npx playwright install chromium
```

Запуск (dev-сервер стартует автоматически, бэкенд не нужен — запросы к `/api/products` перехватываются `page.route()`):

```bash
npm run test:e2e
```

Интерфейс Test Runner:

```bash
npm run test:e2e:ui
```

HTML-отчёт: `npx playwright show-report`.
