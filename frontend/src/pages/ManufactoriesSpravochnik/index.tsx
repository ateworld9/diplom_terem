import { FC, useEffect } from 'react';
import {
  Container, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchManufactoriesSpravochnik } from '../../components/Manufactories/ManufactoriesSpravochnikSlice';
import Manufactories from '../../components/Manufactories';

const ManufactoriesSpravochnik: FC = () => {
  const dispatch = useAppDispatch();
  const { manufactories } = useAppSelector((state) => state.manufactoriesSpravochnikSlice);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(fetchManufactoriesSpravochnik());
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ minHeight: '80vh', mt: '180px', mb: '120px' }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>
        Справочник Цехов
      </Typography>

      {manufactories?.[0] && <Manufactories manufactories={manufactories} />}

    </Container>
  );
};

export default ManufactoriesSpravochnik;
