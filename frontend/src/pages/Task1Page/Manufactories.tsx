import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Manufactory from './Manufactory';
import { IManufactory } from './ManufactoriesSlice';

interface IManufactories {
  manufactories: IManufactory[];
}

const Manufactories: FC<IManufactories> = ({ manufactories }) => (
  <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="left">
            <Typography sx={{ fontWeight: 'bold' }}>
              Номер цеха
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography sx={{ fontWeight: 'bold' }}>
              Кол-во рабочих
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography sx={{ fontWeight: 'bold' }}>
              Мощность цеха
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {manufactories.map((manufactory) => (
          <Manufactory key={`manufactory${manufactory.id}`} {...manufactory} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Manufactories;
