import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Typography, TextField, Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import $api from '../../axios';
import { modalSlice } from './ModalSlice';

const BuyFormModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    surname: '', name: '', otchestvo: '', address: '', tel: '',
  });

  const projectId = useAppSelector((state) => state.projectsReducer?.project?.projectId);

  const handleFormChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { target } = event;
    setFormState((prevState) => ({ ...prevState, [target.id]: target.value }));
  };

  const handleBuyForm = async () => {
    const customerFio = `${formState.surname} ${formState.name} ${formState.otchestvo}`;

    const orderDate = new Date().toISOString().slice(0, 10);

    await $api.post('/order', {
      customerFio, projectId, address: formState.address, orderDate,
    });

    dispatch(modalSlice.actions.handleModalClose());
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
      <Button onClick={handleBuyForm} sx={{ ml: 'auto' }}>
        Отправить заявку
      </Button>
    </Box>
  );
};

export default BuyFormModal;
