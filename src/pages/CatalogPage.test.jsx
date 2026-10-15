import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../store/cartSlice';
import CatalogPage from './CatalogPage';
import { fetchProducts } from '../api/products';

jest.mock('../api/products', () => ({
  fetchProducts: jest.fn(),
}));

function renderWithStore(ui) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
  return store;
}

describe('CatalogPage', () => {
  it('отображает товары, полученные из замоканного API', async () => {
    fetchProducts.mockResolvedValue([
      { id: 'a1', name: 'UI-кит «Пульт»', price: 89, imageUrl: '/images/product-3.webp' },
      { id: 'a2', name: 'Мокапы смартфонов', price: 35, imageUrl: '/images/product-4.webp' },
    ]);

    renderWithStore(<CatalogPage />);

    expect(await screen.findByText('UI-кит «Пульт»')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    expect(fetchProducts).toHaveBeenCalledTimes(1);
  });

  it('кнопка «В корзину» добавляет товар в store', async () => {
    const user = userEvent.setup();
    fetchProducts.mockResolvedValue([
      { id: 'a1', name: 'UI-кит «Пульт»', price: 89, imageUrl: '/images/product-3.webp' },
    ]);

    const store = renderWithStore(<CatalogPage />);
    await user.click(await screen.findByRole('button', { name: 'В корзину' }));

    expect(store.getState().cart.items).toEqual([
      { id: 'a1', name: 'UI-кит «Пульт»', price: 89, imageUrl: '/images/product-3.webp', quantity: 1 },
    ]);
  });

  it('показывает сообщение об ошибке, если API недоступно', async () => {
    fetchProducts.mockRejectedValue(new Error('Ошибка загрузки товаров: 500'));

    renderWithStore(<CatalogPage />);

    expect(await screen.findByText('Ошибка загрузки товаров: 500')).toBeInTheDocument();
  });
});
