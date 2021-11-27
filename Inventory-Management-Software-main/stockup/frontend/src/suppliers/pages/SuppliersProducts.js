import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SuppliersList from '../components/SuppliersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const SuppliersProducts = () => {
  const [loadedSuppliers, setLoadedSuppliers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;



  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
          let responseData;
          responseData = await sendRequest('http://localhost:5000/api/suppliers/all');
        setLoadedSuppliers(responseData.suppliers);
        console.log(responseData)
      } catch (err) {console.log(err);}
    };
    fetchSuppliers();
  }, [sendRequest, userId]);

  const supplierDeletedHandler = deletedSupplierId => {
    setLoadedSuppliers(prevSuppliers =>
      prevSuppliers.filter(supplier => supplier.id !== deletedSupplierId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSuppliers && (
        <SuppliersList items={loadedSuppliers} onDeleteSuppliers={supplierDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default SuppliersProducts;
