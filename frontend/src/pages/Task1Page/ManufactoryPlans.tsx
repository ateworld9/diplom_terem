import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Typography } from '@mui/material';
import ManufactoryPlan from './ManufactoryPlan';
import { IManufactoryP } from './ManufactoriesPlansSlice';

interface IPManufactories {
  manufactories: IManufactoryP[];
}

const ManufactoriesPlans: FC<IPManufactories> = ({ manufactories }) => (
  <>

    {manufactories.map((manufactory) => (
      <ManufactoryPlan key={`manufactoryPlan${manufactory.manufactoryId}`} {...manufactory} />
    ))}

  </>
);

export default ManufactoriesPlans;
