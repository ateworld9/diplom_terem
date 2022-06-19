import { FC, useEffect } from 'react';
import {
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
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
        Справочник Цехов
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

    </Container>
  );
};

export default OrdersIndoc;
