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
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { IManufactoryP } from './ManufactoriesPlansSlice';

const ManufactoryPlan: FC<IManufactoryP> = ({
  manufactoryId, manufactoryPowers, manufactoryPlan, docDate,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<GridExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
          План цеха №
          {manufactoryId}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ margin: 1 }}>

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
                    Наименование изделия
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Необходимое оборудование
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Необходимое Кол-во
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Время производства
                  </Typography>
                </TableCell>
                {/* <TableCell align="right">
                      Ссылка на документ самого изделия
                    </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {manufactoryPlan?.map((item) => (
                <TableRow key={`${item.orderId}MP Row${item.productName}`}>
                  <TableCell component="th" scope="row">
                    {item.productId}
                  </TableCell>
                  <TableCell>
                    {item.productName}
                  </TableCell>
                  <TableCell>
                    {item.equipmentName}
                  </TableCell>
                  <TableCell align="center">
                    {item.productCount.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {item.timeToProduce}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </AccordionDetails>
    </Accordion>

  );
};

export default ManufactoryPlan;
