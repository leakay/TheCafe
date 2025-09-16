import React, { useEffect, useState } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../../Db';
import './Customers.css';

export default function Customers(){
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({name:'', email:'', phone:''});
  const [editingId, setEditingId] = useState(null);

  const fetch = async ()=> {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  useEffect(()=>{ fetch(); }, []);

  const handleAdd = async (e)=>{
    e.preventDefault();
    if(editingId){
      await updateCustomer(editingId, form);
      setEditingId(null);
    } else {
      await addCustomer(form);
    }
    setForm({name:'', email:'', phone:''});
    fetch();
  };

  const handleEdit = (c)=>{
    setEditingId(c.id);
    setForm({name:c.name, email:c.email, phone:c.phone});
  };

  const handleDelete = async (id)=>{
    if(!window.confirm('Delete customer?')) return;
    await deleteCustomer(id);
    fetch();
  };

  return (
    <div className="customers-container">
      <h2>Customers</h2>
      <form className="customer-form" onSubmit={handleAdd}>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" required />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" />
        <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" />
        <button type="submit">{editingId ? 'Update' : 'Add Customer'}</button>
      </form>

      <div className="customers-list">
        {customers.map(c=>(
          <div className="customer-card" key={c.id}>
            <h3>{c.name}</h3>
            <p>{c.email} - {c.phone}</p>
            <div className="actions">
              <button className="edit-btn" onClick={()=>handleEdit(c)}>Edit</button>
              <button className="delete-btn" onClick={()=>handleDelete(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
