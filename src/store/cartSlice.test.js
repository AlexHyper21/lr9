import cartReducer, { addToCart, removeFromCart, clearCart, selectCartCount, selectCartTotal } from './cartSlice';

const icons = { id: 'p1', name: 'Набор иконок «Контур»', price: 29, imageUrl: '/images/product-1.webp' };
const font = { id: 'p2', name: 'Шрифт «Гротеск Норд»', price: 59, imageUrl: '/images/product-2.webp' };

describe('cartSlice reducer', () => {
  it('возвращает начальное состояние с пустой корзиной', () => {
    expect(cartReducer(undefined, { type: '@@INIT' })).toEqual({ items: [] });
  });

  it('addToCart добавляет новый товар в пустую корзину', () => {
    const state = cartReducer(undefined, addToCart({ product: icons, quantity: 2 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      id: 'p1',
      name: 'Набор иконок «Контур»',
      price: 29,
      imageUrl: '/images/product-1.webp',
      quantity: 2,
    });
  });

  it('addToCart по умолчанию добавляет 1 единицу товара', () => {
    const state = cartReducer(undefined, addToCart({ product: font }));

    expect(state.items[0].quantity).toBe(1);
  });

  it('addToCart увеличивает количество, если товар уже в корзине', () => {
    let state = cartReducer(undefined, addToCart({ product: icons, quantity: 1 }));
    state = cartReducer(state, addToCart({ product: icons, quantity: 3 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(4);
  });

  it('addToCart не изменяет исходное состояние (иммутабельность)', () => {
    const prevState = { items: [] };
    const nextState = cartReducer(prevState, addToCart({ product: icons, quantity: 1 }));

    expect(prevState.items).toHaveLength(0);
    expect(nextState).not.toBe(prevState);
  });

  it('removeFromCart удаляет товар, clearCart очищает корзину', () => {
    let state = cartReducer(undefined, addToCart({ product: icons }));
    state = cartReducer(state, addToCart({ product: font }));
    state = cartReducer(state, removeFromCart('p1'));

    expect(state.items.map((item) => item.id)).toEqual(['p2']);
    expect(cartReducer(state, clearCart()).items).toEqual([]);
  });

  it('селекторы считают количество и сумму', () => {
    let cart = cartReducer(undefined, addToCart({ product: icons, quantity: 2 }));
    cart = cartReducer(cart, addToCart({ product: font, quantity: 1 }));

    expect(selectCartCount({ cart })).toBe(3);
    expect(selectCartTotal({ cart })).toBe(117);
  });
});
