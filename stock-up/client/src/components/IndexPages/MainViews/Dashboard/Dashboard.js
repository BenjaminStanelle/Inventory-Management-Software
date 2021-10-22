import React from 'react';
import "./Dashboard.css";


function Dashboard() {
  return (
      <div id="dashboard">
        <h1 className ="title1">Dash Board</h1>
          <nav className="dash-nav">  
          <ul>
            <li><a href="">StockUp</a></li>
            <li><a href="">Company</a></li>
            <li><a href="">Account</a></li>
            <li><a href="">Report</a></li>
            <li><a href="help">Help</a></li>
            <li><a href="">Log Out</a></li>
          </ul>
          </nav>
        <h3 className ="purchasing">Orders</h3>
          <nav className='purchas-nav'>
          <ul>
            <li><a href="">Supplier</a></li>
            <li><a href="Reorder">Re-order</a></li>
            <li><a href="">Purchases</a></li>
          </ul>
          </nav>
        <h3 className ="inventory">Inventory</h3>
          <nav className='purchas-nav'>
          <ul>
            <li><a href="">Products</a></li>
            <li><a href="store">Store</a></li>
            <li><a href="">Stock</a></li>
            <li><a href="">Stock History</a></li>
          </ul>
          </nav>
          
      </div> 
      
  );
}

export default Dashboard;