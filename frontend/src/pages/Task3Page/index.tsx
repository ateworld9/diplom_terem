import { FC, useEffect } from 'react';
import {
  Container, Typography,
} from '@mui/material';

const Task3Page: FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ minHeight: '80vh', mt: '180px', mb: '120px' }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>
        Задача №3: Контроль выполнения недельных планов работы цехов
      </Typography>
    </Container>
  );
};

export default Task3Page;
