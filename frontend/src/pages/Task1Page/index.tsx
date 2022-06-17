import { FC, useEffect, useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, Container, TextField, Typography,
} from '@mui/material';

import { GridExpandMoreIcon as ExpandMoreIcon } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllManufactories } from './ManufactoriesSlice';
import { fetchOrders } from './OrdersSlice';
import Orders from './Orders';
import Manufactories from './Manufactories';
import { fetchManufactoriesPlans } from './ManufactoriesPlansSlice';
import ManufactoriesPlans from './ManufactoryPlans';

const Task1Page: FC = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState('');
  const [bool, setBool] = useState(false);
  const [planBool, setPlanBool] = useState(false);
  const { manufactories } = useAppSelector((state) => state.manufactoriesReducer);
  const manufactoriesP = useAppSelector((state) => state.manufactoriesPlansReducer.manufactories);
  const { orders } = useAppSelector((state) => state.ordersReducer);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(fetchAllManufactories());
    dispatch(fetchOrders());
    dispatch(fetchManufactoriesPlans());
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
            <Button onClick={() => { setBool(true); }}>
              Загрузить данные
            </Button>
          </>
        )
        : (
          <>
            {manufactories?.[0] && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                  Технические характеристики цехов
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {manufactories?.[0] && <Manufactories manufactories={manufactories} />}
              </AccordionDetails>
            </Accordion>
            )}
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

            {planBool ? (
              <>
                <Typography variant="h5" mt={5} mb={3} sx={{ fontWeight: 'bold' }}>
                  {`Решение: План работы цехов на ${date}`}
                </Typography>
                <ManufactoriesPlans manufactories={manufactoriesP} />
                <Button variant="contained" sx={{ mt: 3 }}>
                  Сохранить
                </Button>
              </>
            )
              : (
                <Button variant="contained" onClick={() => { setPlanBool(true); }} sx={{ mt: 3 }}>
                  Расчитать
                </Button>
              )}
          </>
        )}
    </Container>
  );
};

export default Task1Page;
