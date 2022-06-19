import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IOrder } from '../OrdersIndoc/OrdersSlice';

const Order: FC<IOrder> = ({
  orderId, customerFio, orderDate, price, address, project,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {orderId}
        </TableCell>
        <TableCell align="left">
          {customerFio}
        </TableCell>
        <TableCell align="left">
          {project.projectName}
        </TableCell>
        <TableCell align="left">
          {address}
        </TableCell>
        <TableCell align="right">
          {price}
        </TableCell>
        <TableCell align="right">
          {orderDate.slice(0, 10)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                Cпецификация на
                {' '}
                {project.projectName}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Код изделия
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Изделие
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Кол-во
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Ед. изм.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project?.projectSpecification?.specificationItems?.map((item) => (
                    <TableRow key={`spec_i${item.id}`}>
                      <TableCell component="th" scope="row">
                        {item.productId}
                      </TableCell>
                      <TableCell>
                        {item.productName}
                      </TableCell>
                      <TableCell align="right">
                        {item.productCount}
                      </TableCell>
                      <TableCell align="right">
                        {item.unitShort}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Order;
