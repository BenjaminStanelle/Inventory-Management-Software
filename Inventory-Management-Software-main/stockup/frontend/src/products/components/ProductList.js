import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import ProductItem from './ProductItem';
import Button from '../../shared/components/FormElements/Button';
import './ProductList.css';
const ProductList = props => {
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products found. Maybe create one?</h2>
          <Button to="/products/new">Add Product</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="product-list">
      {props.items.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          description={product.description}
          storage_location={product.storage_location}
          length={product.length}
          width={product.width}
          height={product.height}
          creatorId={product.creator}
          count={product.count}
          price={product.price}
          vendorInfo={product.vendorInfo}
          onDelete={props.onDeleteProduct}
        />
      ))}
    </ul>
  );
};
export default ProductList;