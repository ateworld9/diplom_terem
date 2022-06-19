import { FC, useEffect, useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
} from '@mui/material';

import { GridExpandMoreIcon as ExpandMoreIcon, GridExpandMoreIcon } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Orders from './Orders';
import Manufactories from '../../components/Manufactories';
import ManufactoriesPlans from './ManufactoryPlans';
import { fetchManufactoriesSpravochnik } from '../../components/Manufactories/ManufactoriesSpravochnikSlice';
import { fetchManufactoriesProduceProducts } from '../ProduceProductsSpravochnik/ManufactoriesSlice';
import { fetchOrdersByDate } from '../OrdersIndoc/OrdersSlice';
import { fetchManufactoriesPlans } from './ManufactoriesPlansSlice';

const Task1Page: FC = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState('2022-06-01');
  const [bool, setBool] = useState(false);
  const [planBool, setPlanBool] = useState(false);
  const { manufactories } = useAppSelector((state) => state.manufactoriesSpravochnikSlice);
  const manufactoriesProducts = useAppSelector((state) => state.manufactoriesReducer.manufactories);
  const manufactoriesP = useAppSelector((state) => state.manufactoriesPlansReducer.manufactories);
  const { orders } = useAppSelector((state) => state.ordersReducer);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(fetchManufactoriesSpravochnik());
    dispatch(fetchManufactoriesProduceProducts());
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ minHeight: '80vh', mt: '180px', mb: '120px' }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>
        {`Задача №1: Формирование плана работы цехов на ${date}`}
      </Typography>
      { !bool
        ? (
          <>
            <TextField id="date" name="date" label="Расчет документа на дату:" sx={{ mb: 2, width: '100%' }} onChange={(e) => { setDate(e.target.value); }} value={date} />
            <Button onClick={() => { dispatch(fetchOrdersByDate(date)); setBool(true); }}>
              Загрузить данные
            </Button>
          </>
        )
        : (
          <>
            {orders?.[0] && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                  Заказы
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Orders
                  orders={orders}
                />
              </AccordionDetails>
            </Accordion>
            )}
            {manufactories?.[0] && (
            <Accordion key="m">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                  Справочник цехов
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {manufactories?.[0] && <Manufactories manufactories={manufactories} />}
              </AccordionDetails>
            </Accordion>
            )}
            {manufactoriesProducts?.[0]
            && (
            <Accordion key="mp">
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                    Ведомости производимых цехами издеий
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {manufactoriesProducts.map((manufactory) => (
                  <Accordion key={`mp${manufactory.manufactoryId}`}>
                    <AccordionSummary
                      expandIcon={<GridExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography component="label" sx={{ fontWeight: 'bold' }}>
                        {manufactory.manufactoryName}
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
              </AccordionDetails>
            </Accordion>
            )}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                disabled
              >
                <Typography>
                  Ведомость невыполненных работ [За прошлую неделю]
                </Typography>
              </AccordionSummary>
            </Accordion>

            {!planBool ? (
              <Button variant="contained" onClick={() => { dispatch(fetchManufactoriesPlans(date)); setPlanBool(true); }} sx={{ mt: 3 }}>
                Расчитать
              </Button>
            )
              : (
                <>
                  <Typography variant="h5" mt={5} mb={3} sx={{ fontWeight: 'bold' }}>
                    {`Решение: План работы цехов на ${date}`}
                  </Typography>
                  <ManufactoriesPlans manufactories={manufactoriesP} />
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Сохранить
                  </Button>
                </>
              )}
          </>
        )}
    </Container>
  );
};

export default Task1Page;
