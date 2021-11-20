import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const NewProduct = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      storage_location: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }

    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      console.log(formState.inputs.image.value);
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('length', formState.inputs.length.value);
      formData.append('width', formState.inputs.width.value);
      formData.append('height', formState.inputs.height.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('storage_location', formState.inputs.storage_location.value);
      formData.append('image', formState.inputs.image.value);

  
      await sendRequest('http://localhost:5000/api/products', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {console.log(err);}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
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
          id="storage_location"
          element="input"
          label="Storage location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PRODUCT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
