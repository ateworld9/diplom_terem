import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';

const MainPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <Container component="section" maxWidth="xl" sx={{ mt: '180px', mb: '120px' }}>
        <Typography component="h1" sx={{ mx: '20%', fontSize: '80px', fontWeight: 700 }}>
          Дом, который
        </Typography>
        <Typography component="h2" sx={{ mx: '20%', fontSize: '80px', fontWeight: 700 }}>
          нужен мне
        </Typography>
      </Container>
      <Box component="section" display="flex">
        <img src="/images/1picture.jpeg" alt="picture1" style={{ height: '100%' }} />
      </Box>
    </>
  );
};

export default MainPage;
