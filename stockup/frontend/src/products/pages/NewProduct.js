import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
<<<<<<< HEAD

=======
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
<<<<<<< HEAD

=======
import './ProductForm.css';
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1

const NewProduct = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
<<<<<<< HEAD
      name: {
=======
      title: {
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
<<<<<<< HEAD
      storage_location: {
        value: '',
        isValid: false
      },


=======
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
    },
    false
  );

  const history = useHistory();

<<<<<<< HEAD
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('length', formState.inputs.length.value);
      formData.append('width', formState.inputs.width.value);
      formData.append('height', formState.inputs.height.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('storage_location', formState.inputs.storage_location.value);

  
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
=======
  const productSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/products', 'POST', formData, {
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
<<<<<<< HEAD
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="length"
          element="input"
          type="number"
          label="Length"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid length."
          onInput={inputHandler}
        />
        <Input
          id="width"
          element="input"
          type="number"
          label="Width"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid width."
          onInput={inputHandler}
        />
        <Input
          id="height"
          element="input"
          type="number"
          label="Height"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid height."
=======
      <form className="product-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
<<<<<<< HEAD
          id="storage_location"
          element="input"
          label="Storage location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
=======
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PRODUCT
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
