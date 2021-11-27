import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './SuppliersItem.css';

const SuppliersItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/suppliers/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="suppliers-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this supplier? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li><div> <h2>  Hello World</h2></div> </li>
      <li className="suppliers-item">
        <Card className="suppliers-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="suppliers-item__image">
             <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
             />
          </div>
          <div className="suppliers-item__info">
            <h2>{props.name}</h2>
            <h3>{props.description}</h3>
            {
              props.width && props.length && props.height && 
              <p>{'Dimensions: (' + props.width + ', ' + props.length + ', ' + props.height + ')'}</p>
            }
            <p>{'Location: ' + props.storage_location}</p>
            <p>{'Count: ' + props.count} + {props.count === 1 ? 'Item Remaining' : 'Items Remaining'} {props.count < 10 ? '[Low on Stock]}' : ''}</p>
          </div>
          <div className="suppliers-item__actions">
            {auth.userId === props.creatorId && (
              <Button to={`/suppliers/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
            {auth.userId !== props.creatorId && (
              <p>You do not own this item.</p>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default SuppliersItem;
