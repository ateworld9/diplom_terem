import { FC, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { GridExpandMoreIcon as ExpandMoreIcon } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSpecifications, ISpecificationItem } from './SpecificationsSlice';

const SpecificationsSpravochnik: FC = () => {
  const dispatch = useAppDispatch();
  const { specifications } = useAppSelector((state) => state.specificationsSlice);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(fetchSpecifications());
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ minHeight: '80vh', mt: '180px', mb: '120px' }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>
        Реестр спецификаций
      </Typography>
      {specifications?.[0] && specifications.map((spec) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1" gutterBottom component="div">
              Номер спецификации:
              {' '}
              <Typography component="label" sx={{ fontWeight: 'bold' }}>
                {spec.specificationId}
              </Typography>
              <br />
              Проект:
              {' '}
              <Typography component="label" sx={{ fontWeight: 'bold' }}>
                {spec.projectName}
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
                        Кол-во
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {spec.specificationItems?.map((item: ISpecificationItem) => (
                    <TableRow key={`si${spec.specificationId}${item.productId}`}>
                      <TableCell>
                        {item.productName}
                      </TableCell>
                      <TableCell align="left">
                        {item.unitShort}
                      </TableCell>
                      <TableCell>
                        {item.productCount}
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

export default SpecificationsSpravochnik;
