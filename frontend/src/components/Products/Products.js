import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../Db';
import './Products.css';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({name:'', description:'', price:0});
  const [editingId, setEditingId] = useState(null);

  const fetch = async ()=> {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(()=>{ fetch(); }, []);

  const handleAdd = async (e)=>{
    e.preventDefault();
    if(editingId){
      await updateProduct(editingId, form);
      setEditingId(null);
    } else {
      await addProduct(form);
    }
    setForm({name:'', description:'', price:0});
    fetch();
  };

  const handleEdit = (p)=>{
    setEditingId(p.id);
    setForm({name:p.name, description:p.description, price:p.price});
  };

  const handleDelete = async (id)=>{
    if(!window.confirm('Delete product?')) return;
    await deleteProduct(id);
    fetch();
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <form className="product-form" onSubmit={handleAdd}>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" required />
        <input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" />
        <input type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} placeholder="Price" />
        <button type="submit">{editingId ? 'Update' : 'Add Product'}</button>
      </form>

      <div className="products-grid">
        {products.map(p=>(
          <div className="product-card" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>{p.price} ZAR</strong></p>
            <div className="actions">
              <button className="edit-btn" onClick={()=>handleEdit(p)}>Edit</button>
              <button className="delete-btn" onClick={()=>handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
