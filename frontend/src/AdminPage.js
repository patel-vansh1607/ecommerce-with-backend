import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/products', formData);
      alert('Product added!');
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required /><br />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" /><br />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;
