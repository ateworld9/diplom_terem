import { FC, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchManufactoriesProduceProducts } from './ManufactoriesSlice';

const ProduceProductsSpravochnik: FC = () => {
  const dispatch = useAppDispatch();
  const { manufactories } = useAppSelector((state) => state.manufactoriesSpravochnikSlice);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(fetchManufactoriesProduceProducts());
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ minHeight: '80vh', mt: '180px', mb: '120px' }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>
        Реестр ведомостей производимых цехами изделий
      </Typography>

      {manufactories?.[0]
       && manufactories.map((manufactory) => (
         <Accordion>
           <AccordionSummary
             expandIcon={<GridExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
             <Typography variant="body1" gutterBottom component="div">
               <Typography component="label" sx={{ fontWeight: 'bold' }}>
                 {manufactory.manufactoryName}
               </Typography>
             </Typography>
           </AccordionSummary>
           <AccordionDetails>
             <TableContainer component={Paper}>
               <Table>
                 <TableHead>
                   <TableRow>
                     <TableCell align="left">
                       <Typography sx={{ fontWeight: 'bold' }}>
                         Необходимое оборудование
                       </Typography>
                     </TableCell>
                     <TableCell align="left">
                       <Typography sx={{ fontWeight: 'bold' }}>
                         Наименование изделия
                       </Typography>
                     </TableCell>
                     <TableCell align="left">
                       <Typography sx={{ fontWeight: 'bold' }}>
                         Ед. изм
                       </Typography>
                     </TableCell>
                     <TableCell align="left">
                       <Typography sx={{ fontWeight: 'bold' }}>
                         Время выполнения
                       </Typography>
                     </TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {manufactory?.manufactoryProduceProducts?.map((item) => (
                     <TableRow key={`mpp${manufactory.manufactoryId}${item.productId}`}>
                       <TableCell>
                         {item.equipmentName}
                       </TableCell>
                       <TableCell>
                         {item.productName}
                       </TableCell>
                       <TableCell align="left">
                         {item.unitShort}
                       </TableCell>
                       <TableCell>
                         {`${item.timeToProduce} ч.`}
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
           </AccordionDetails>
         </Accordion>
       ))}

    </Container>
  );
};

export default ProduceProductsSpravochnik;
