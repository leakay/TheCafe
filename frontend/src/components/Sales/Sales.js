import React, { useEffect, useState } from 'react';
import { getSales, addSale, getProducts, getCustomers, getStock, updateStock } from '../../Db';
import './Sales.css';

export default function Sales(){
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({productId:'', customerId:'', amount:0, date:''});

  const fetchAll = async ()=>{
    setSales((await getSales()).data);
    setProducts((await getProducts()).data);
    setCustomers((await getCustomers()).data);
    setStock((await getStock()).data);
  };

  useEffect(()=>{ fetchAll(); }, []);

  const handleSale = async (e)=>{
    e.preventDefault();
    const prodId = Number(form.productId);
    const qtyToReduce = 1; // one unit per sale in this simple example

    // find stock item
    const stockItem = stock.find(s => s.productId === prodId);
    if(!stockItem || stockItem.quantity <= 0){
      alert('Insufficient stock for this product');
      return;
    }

    // create sale
    await addSale({ productId: prodId, customerId: Number(form.customerId), amount: Number(form.amount), date: form.date || new Date().toISOString().slice(0,10) });

    // update stock quantity
    await updateStock(stockItem.id, { ...stockItem, quantity: stockItem.quantity - qtyToReduce });

    // fetch again and alert if low
    await fetchAll();
    const updated = (await getStock()).data.find(s=>s.productId===prodId);
    if(updated.quantity <= 5){
      alert('Warning: stock level is low for this product (<=5)');
    }
  };

  return (
    <div className="sales-container">
      <h2>Sales</h2>
      <form className="sales-form" onSubmit={handleSale}>
        <select value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})} required>
          <option value="">Select product</option>
          {products.map(p=> <option key={p.id} value={p.id}>{p.name}</option> )}
        </select>
        <select value={form.customerId} onChange={e=>setForm({...form, customerId:e.target.value})} required>
          <option value="">Select customer</option>
          {customers.map(c=> <option key={c.id} value={c.id}>{c.name}</option> )}
        </select>
        <input type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} placeholder="Amount" required />
        <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
        <button type="submit">Make Sale</button>
      </form>

      <div className="sales-list">
        {sales.map(s=>(
          <div key={s.id} className="sale-card">
            <p>Sale #{s.id} - Product:{s.productId} Customer:{s.customerId} Amount:{s.amount} Date:{s.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
