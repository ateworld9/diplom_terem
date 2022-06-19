import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { IOrder } from '../OrdersIndoc/OrdersSlice';
import Order from './Order';

// const columns: GridColDef[] = [
//   { field: 'productId', headerName: 'Id записи', width: 150 },
//   { field: 'productName', headerName: 'Изделие', width: 400 },
//   { field: 'productCount', headerName: 'Кол-во', width: 150 },
//   { field: 'unitShort', headerName: 'Ед. изм.', width: 150 },
// ];

interface I {
  orders: IOrder[];
}

const Orders: FC<I> = ({ orders }) => (
  <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
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
          <Order key={`order${order.orderId}`} {...order} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Orders;
