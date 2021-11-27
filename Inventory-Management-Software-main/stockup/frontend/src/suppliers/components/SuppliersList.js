import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import SuppliersItem from './SuppliersItem';
import './SuppliersList.css';

const SuppliersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="suppliers-list center">
        <Card>
          <h2>No Suppliers found. Maybe create one?</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="suppliers-list">
      {props.items.map(suppliers => (
        <SuppliersItem
          id={suppliers.id}
          name={suppliers.name}
          website={suppliers.website}
          logo={suppliers.logo}
          description={suppliers.description}
        />
      ))}
    </ul>
  );
};

export default SuppliersList;
