import React from 'react';
import "./Reorder.css";


function Reorder() {
  return (
    <div id="reorder">
        <h1 className ="title">Re-order</h1>
        <li><a href="dashboard">Dashboard</a></li>
        <h3 className="product-name">Product name</h3>
        <input
            type="text"
            name="name"
            id="product-name"
        />
        <h3 className="quantity">Quantity</h3>
        <input
            type="number"
            name="quantity"
            id="quantity"
        />
        <h3 className="category">Category</h3>
        <input
            type="text"
            name="category"
            id="category"
        />
        <h3 className="store">Store</h3>
        <input
            type="text"
            name="store"
            id="store"
        />
    <button>Confirm</button>
    </div> 
    
    
  );
}

export default Reorder;