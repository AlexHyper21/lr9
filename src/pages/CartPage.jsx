import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import CartList from '../components/CartList/CartList';
import { clearCart, removeFromCart, selectCartItems, selectCartTotal } from '../store/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <Container as="main" className="py-4 py-md-5" style={{ maxWidth: 760 }}>
      <h1 className="h2 fw-bold mb-4">Корзина</h1>
      {items.length === 0 ? (
        <Alert variant="light" className="border">
          Корзина пуста. <Link to="/catalog">Перейти в каталог</Link>
        </Alert>
      ) : (
        <>
          <CartList items={items} onRemove={(id) => dispatch(removeFromCart(id))} />
          <Stack direction="horizontal" className="justify-content-between align-items-center mt-4">
            <Button variant="outline-secondary" onClick={() => dispatch(clearCart())}>Очистить</Button>
            <div className="fs-4">
              Итого: <strong data-testid="cart-total">{total} BYN</strong>
            </div>
          </Stack>
        </>
      )}
    </Container>
  );
}
