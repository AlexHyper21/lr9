import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ProductCard from '../components/ProductCard/ProductCard';
import { fetchProducts } from '../api/products';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchProducts()
      .then((data) => {
        if (!ignore) {
          setProducts(data);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setStatus('error');
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container as="main" className="py-4 py-md-5">
      <h1 className="h2 fw-bold mb-4">Каталог цифровых товаров</h1>
      {status === 'loading' && <Spinner animation="border" role="status" />}
      {status === 'error' && <Alert variant="danger">{error}</Alert>}
      {status === 'success' && (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4" data-testid="product-grid">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
