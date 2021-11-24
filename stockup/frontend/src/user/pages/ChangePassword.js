import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './ChangePassword.css';

const ChangePassword = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showChangedModel, setShowChangedModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      oldpassword: {
        value: '',
        isValid: false
      },
      newpassword: {
        value: '',
        isValid: false
      },
      newpasswordcopy: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const backtoMyProducts = () => {
    window.location.href=`/${auth.userId}/products`; 
  }

  const changePasswordHandler = async event => {
    event.preventDefault();

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/password/${auth.userId}`,
          'PATCH',
          JSON.stringify({
            oldpassword: formState.inputs.oldpassword.value,
            newpassword: formState.inputs.newpassword.value,
            newpasswordcopy: formState.inputs.newpasswordcopy.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );

        auth.login(responseData.userId, responseData.token);
        setShowChangedModal(true);
      } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showChangedModel}
        footerClass="password__modal"
        footer={
            <React.Fragment>
                  <Button onClick={backtoMyProducts}>
                    Go Back To My Products.
                  </Button>
            </React.Fragment>
        }
      >
              <h2> Password Changed! </h2>  
        </Modal>
      <Card className="passwordform">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Change Your Password</h2>
          <form onSubmit={changePasswordHandler}>
            <Input
              element="input"
              id="oldpassword"
              type="password"
              label="Old Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter your old password."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="newpassword"
              type="password"
              label="New Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a new valid password, at least 6 characters."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="newpasswordcopy"
              type="password"
              label="Re-enter New Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please re-enter your new password."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid || formState.newpasswordcopy != formState.newpassword}>
                Change Password
            </Button>
          </form>
      </Card>
    </React.Fragment>
  );
};

export default ChangePassword;
