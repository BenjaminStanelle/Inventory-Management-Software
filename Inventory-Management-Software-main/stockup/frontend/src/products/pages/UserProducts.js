import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '../components/ProductList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;



  useEffect(() => {
    const fetchProducts = async () => {
      try {
          let responseData;

          if(userId) {
            responseData = await sendRequest(`http://localhost:5000/api/products/user/${userId}`);
          } 
        setLoadedProducts(responseData.products);
      } catch (err) {console.log(err);}
    };
    fetchProducts();
  }, [sendRequest, userId]);

  const productDeletedHandler = deletedProductId => {
    setLoadedProducts(prevProducts =>
      prevProducts.filter(product => product.id !== deletedProductId)
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
      {!isLoading && loadedProducts && (
        <ProductList items={loadedProducts} onDeleteProduct={productDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserProducts;
