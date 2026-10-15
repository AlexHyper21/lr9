import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { addToCart } from '../../store/cartSlice';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import starIcon from '../../assets/star.svg';
import starEmptyIcon from '../../assets/star-empty.svg';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.inStock !== false;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const stars = [1, 2, 3, 4, 5].map((n) => n <= Math.round(product.rating || 0));

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Card className="h-100 border shadow-sm overflow-hidden" data-testid="product-card">
      <div className="position-relative bg-body-tertiary">
        <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="object-fit-cover rounded-0" />
        {discount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">−{discount} %</Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column gap-2">
        {product.formats && (
          <Stack direction="horizontal" gap={1}>
            {product.formats.map((format) => (
              <Badge key={format} bg="light" text="secondary" className="border">{format}</Badge>
            ))}
          </Stack>
        )}
        <Card.Title as="h3" className="fs-6 fw-semibold mb-0">{product.name}</Card.Title>
        {product.seller && (
          <Card.Subtitle className="small text-secondary fw-normal">{product.seller}</Card.Subtitle>
        )}
        {product.rating > 0 && (
          <Stack direction="horizontal" gap={1} className="small text-secondary">
            {stars.map((filled, i) => (
              <img key={i} src={filled ? starIcon : starEmptyIcon} alt="" width="14" height="14" />
            ))}
            <span className="ms-1">{product.rating} · {product.reviews} отзывов</span>
          </Stack>
        )}
        <Stack direction="horizontal" gap={2} className="align-items-baseline mt-auto">
          <span className="fs-4 fw-bold">{product.price} BYN</span>
          {product.oldPrice && (
            <span className="small text-secondary text-decoration-line-through">{product.oldPrice} BYN</span>
          )}
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <QuantitySelector onChange={setQuantity} disabled={!inStock} />
          <Button variant="primary" className="flex-grow-1 fw-semibold" onClick={handleAdd} disabled={!inStock}>
            {inStock ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    seller: PropTypes.string,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    formats: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
    inStock: PropTypes.bool,
  }).isRequired,
};
