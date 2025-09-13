import React from 'react';
import Products from '../Products/Products';
import Customers from '../Customers/Customers';
import Sales from '../Sales/Sales';
import Stock from '../Stock/Stock';
import Reports from '../Reports/Reports';
import './Dashboard.css';

export default function Dashboard(){
  return (
    <div className="dashboard-main" id="dashboard">
      <h1 style={{padding:'20px'}}>Dashboard</h1>
      <div className="dashboard-grid">
        <div id="products"><Products /></div>
        <div id="customers"><Customers /></div>
        <div id="sales"><Sales /></div>
        <div id="stock"><Stock /></div>
        <div id="reports"><Reports /></div>
      </div>
    </div>
  );
}
