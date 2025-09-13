import React from 'react';
import './Header.css';

export default function Header(){
  return (
    <header className="header">
      <div className="logo">Wings Cafe</div>
      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#products">Products</a>
        <a href="#customers">Customers</a>
        <a href="#sales">Sales</a>
        <a href="#stock">Stock</a>
        <a href="#reports">Reports</a>
      </nav>
      <div className="user-profile">
        <span>Admin</span>
        <img src="https://via.placeholder.com/40" alt="user"/>
      </div>
    </header>
  );
}
