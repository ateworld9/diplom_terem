import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Typography, TextField, Button } from '@mui/material';

const BuyFormModal: React.FC = () => {
  const [formState, setFormState] = useState({
    surname: '', name: '', otchestvo: '', address: '', tel: '',
  });

  const handleFormChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { target } = event;
    setFormState((prevState) => ({ ...prevState, [target.id]: target.value }));
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }} mb={2}>
        Оставить заявку на покупку проекта
      </Typography>
      <TextField id="surname" name="surname" label="Фамилия" sx={{ mb: 2, width: '100%' }} onChange={handleFormChange} value={formState.surname} />
      <TextField id="name" name="name" label="Имя" sx={{ mb: 2, width: '100%' }} onChange={handleFormChange} value={formState.name} />
      <TextField id="otchestvo" name="otchestvo" label="Отчество" sx={{ mb: 2, width: '100%' }} onChange={handleFormChange} value={formState.otchestvo} />
      <TextField id="tel" name="tel" label="+7 900 000 0000" sx={{ mb: 2, width: '100%' }} onChange={handleFormChange} value={formState.tel} />
      <TextField id="address" name="address" label="Адрес" sx={{ mb: 2, width: '100%' }} onChange={handleFormChange} value={formState.address} />
      <Button onClick={() => null} sx={{ ml: 'auto' }}>
        Отправить заявку
      </Button>
    </Box>
  );
};

export default BuyFormModal;
