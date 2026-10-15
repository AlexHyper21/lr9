import { test, expect } from '@playwright/test';

const mockProducts = [
  { _id: '6721f3a9c2b1e4d5f6a7b801', name: 'Набор иконок «Контур» · 640 штук', price: 29, imageUrl: '/images/product-1.webp' },
  { _id: '6721f3a9c2b1e4d5f6a7b802', name: 'Шрифт «Гротеск Норд» · 4 начертания', price: 59, imageUrl: '/images/product-2.webp' },
  { _id: '6721f3a9c2b1e4d5f6a7b803', name: 'UI-кит «Пульт» для дашбордов', price: 89, imageUrl: '/images/product-3.webp' },
];

test.describe('Сценарий «Добавление в корзину»', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/products', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProducts),
      })
    );
  });

  test('пользователь добавляет товар из каталога и видит его в корзине', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.getByRole('heading', { name: 'Каталог цифровых товаров' })).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(3);

    const card = page.getByTestId('product-card').filter({ hasText: 'UI-кит «Пульт» для дашбордов' });
    await card.getByRole('button', { name: '+' }).click();
    await expect(card.getByRole('textbox')).toHaveValue('2');
    await card.getByRole('button', { name: 'В корзину' }).click();

    await expect(page.getByTestId('cart-count')).toHaveText('2');

    await page.getByTestId('cart-link').click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole('heading', { name: 'Корзина' })).toBeVisible();

    const items = page.getByTestId('cart-item');
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText('UI-кит «Пульт» для дашбордов');
    await expect(items.first()).toContainText('2 × 89 BYN');
    await expect(page.getByTestId('cart-total')).toHaveText('178 BYN');
  });
});
