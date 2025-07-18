import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 5 }}>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p><strong>${product.price}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
