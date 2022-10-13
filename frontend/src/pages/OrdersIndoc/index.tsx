import { FC, useEffect } from 'react';
import {
  Button,
  Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOrders } from './OrdersSlice';

const OrdersIndoc: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.ordersReducer);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(fetchOrders());
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ minHeight: '80vh', mt: '180px', mb: '120px' }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>
        Реестр договоров на строительство объекта деревянного строительства
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Номер заказа
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography sx={{ fontWeight: 'bold' }}>
                  ФИО заказчика
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Наименование проекта
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Адрес
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Полная стоимость
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Дата
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                  {order.orderId}
                </TableCell>
                <TableCell align="left">
                  {order.customerFio}
                </TableCell>
                <TableCell align="left">
                  {order.project.projectName}
                </TableCell>
                <TableCell align="left">
                  {order.address}
                </TableCell>
                <TableCell align="right">
                  {order.price}
                </TableCell>
                <TableCell align="right">
                  {order.orderDate.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменение строки документа
          </Typography>
          <Box display="flex" my={4}>

            <TextField label="Фио заказчика" sx={{ mr: 1, width: '100%' }} value="Тестов Тест Тестович" />
            <TextField label="Проект" sx={{ mr: 1, width: '100%' }} value="Лидер 6" />
            <TextField label="Адрес" sx={{ mr: 1, width: '100%' }} value="Тестовый адрес" />
            <TextField label="Стоимость" sx={{ mr: 1, width: '100%' }} value="1290600" />
            <TextField label="Дата" sx={{ mr: 1, width: '100%' }} value="2022-06-17" />
          </Box>
          <Button variant="contained" sx={{ ml: '89%' }}>
            Сохранить
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default OrdersIndoc;
