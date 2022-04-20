import React from 'react';
import { Box } from '@mui/system';
import { Typography, TextField, Button } from '@mui/material';

import { useAppDispatch } from '../../hooks/redux';
import { Modals, modalSlice } from './ModalSlice';

interface IAuthorizationModal {
  email: string
  password: string
  handleAuthorize: () => void
  handleAuthorizeFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const AuthorizationModal: React.FC<IAuthorizationModal> = ({
  email, password, handleAuthorize, handleAuthorizeFormChange,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }} mb={2}>
        Авторизация
      </Typography>
      <TextField id="email" name="email" label="Email" sx={{ mb: 2, width: '100%' }} onChange={handleAuthorizeFormChange} value={email} />
      <TextField id="password" name="password" label="Password" sx={{ mb: 2, width: '100%' }} onChange={handleAuthorizeFormChange} value={password} />
      <Box display="flex">
        <Button variant="text" onClick={() => dispatch(modalSlice.actions.handleModalOpen(Modals.Registration))}>
          Регистрация
        </Button>
        <Button variant="contained" onClick={handleAuthorize} sx={{ ml: 'auto' }}>
          Войти
        </Button>
      </Box>
    </Box>
  );
};

export default AuthorizationModal;
