import React from 'react';
import { Box, LinearProgress, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchLogin, fetchRegistration } from '../../store/reducers/ActionCreators';

import RegistrationModal from './RegistrationModal';
import AuthorizationModal from './AuthorizationModal';
import { Modals, modalSlice } from './ModalSlice';
import BuyFormModal from './BuyForm';

const CustomModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalState } = useAppSelector((state) => state.modalReducer);

  const { user, isLoading } = useAppSelector((state) => state.userReducer);

  React.useEffect(() => {
    dispatch(modalSlice.actions.handleModalClose());
  }, [user.email]);

  const [authorizeForm, setAuthorizeForm] = React.useState({ email: '', password: '' });
  const handleAuthorizeFormChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { target } = event;
    setAuthorizeForm((prevState) => ({ ...prevState, [target.id]: target.value }));
  };
  const handleRegistration = () => {
    dispatch(fetchRegistration(authorizeForm.email, authorizeForm.password));
    setAuthorizeForm({ email: '', password: '' });
  };
  const handleAuthorize = () => {
    dispatch(fetchLogin(authorizeForm.email, authorizeForm.password));
    setAuthorizeForm({ email: '', password: '' });
  };
  return (
    <Modal
      open={!!modalState}
      onClose={() => dispatch(modalSlice.actions.handleModalClose())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
      >
        { modalState === Modals.Registration && (
        <RegistrationModal
          email={authorizeForm.email}
          password={authorizeForm.password}
          handleAuthorizeFormChange={handleAuthorizeFormChange}
          handleRegistration={handleRegistration}
        />
        )}
        { modalState === Modals.Login && (
        <AuthorizationModal
          email={authorizeForm.email}
          password={authorizeForm.password}
          handleAuthorize={handleAuthorize}
          handleAuthorizeFormChange={handleAuthorizeFormChange}
        />
        )}
        { modalState === Modals.BuyForm && (
        <BuyFormModal />
        )}
        {isLoading && <LinearProgress sx={{ mt: 2 }} />}
      </Box>
    </Modal>
  );
};

export default CustomModal;
