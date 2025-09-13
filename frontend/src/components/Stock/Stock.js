import React, { useEffect, useState } from 'react';
import { getStock, getProducts, updateStock, addStock } from '../../Db';
import './Stock.css';

export default function Stock(){
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({productId:'', quantity:0});

  const fetchAll = async ()=>{
    setStock((await getStock()).data);
    setProducts((await getProducts()).data);
  };

  useEffect(()=>{ fetchAll(); }, []);

  const handleUpdate = async (id, qty)=>{
    await updateStock(id, { ...stock.find(s=>s.id===id), quantity: qty });
    fetchAll();
  };

  const handleAdd = async (e)=>{
    e.preventDefault();
    await addStock({ productId: Number(form.productId), quantity: Number(form.quantity) });
    setForm({productId:'', quantity:0});
    fetchAll();
  };

  return (
    <div className="stock-container">
      <h2>Stock</h2>

      <form className="stock-form" onSubmit={handleAdd}>
        <select value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})} required>
          <option value="">Select product</option>
          {products.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input type="number" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} placeholder="Quantity" required />
        <button type="submit">Add Stock</button>
      </form>

      <table className="stock-table">
        <thead><tr><th>Product</th><th>Quantity</th><th>Actions</th></tr></thead>
        <tbody>
          {stock.map(s=>{
            const prod = products.find(p=>p.id===s.productId) || {};
            return (
              <tr key={s.id} className={s.quantity <=5 ? 'low-stock' : ''}>
                <td>{prod.name || ('Product '+s.productId)}</td>
                <td>{s.quantity}</td>
                <td>
                  <button onClick={()=>handleUpdate(s.id, s.quantity+1)}>+1</button>
                  <button onClick={()=>handleUpdate(s.id, Math.max(0, s.quantity-1))}>-1</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
