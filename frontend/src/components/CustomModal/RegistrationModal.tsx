import { Box } from '@mui/system';
import { Typography, TextField, Button } from '@mui/material';
import React from 'react';

interface IRegistraionModal {
  email: string
  password: string
  handleRegistration: () => void
  handleAuthorizeFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const RegistraionModal: React.FC<IRegistraionModal> = ({
  email, password, handleRegistration, handleAuthorizeFormChange,
}) => (
  <Box display="flex" flexDirection="column">
    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }} mb={2}>
      Регистрация
    </Typography>
    <TextField id="email" name="email" label="Email" sx={{ mb: 2, width: '100%' }} onChange={handleAuthorizeFormChange} value={email} />
    <TextField id="password" name="password" label="Password" sx={{ mb: 2, width: '100%' }} onChange={handleAuthorizeFormChange} value={password} />
    <Button onClick={handleRegistration} sx={{ ml: 'auto' }}>
      Зарегистрироваться
    </Button>
  </Box>
);

export default RegistraionModal;
