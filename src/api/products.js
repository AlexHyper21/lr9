export async function fetchProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error(`Ошибка загрузки товаров: ${response.status}`);
  }
  const data = await response.json();
  return data.map((product) => ({ ...product, id: product._id }));
}
