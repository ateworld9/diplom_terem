import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { Box } from '@mui/system';

import { setupStore } from '../../store';
import theme from '../../theme';

import Header from '../Header';
import Footer from '../Footer';
import MainPage from '../MainPage';
import CategoriesCatalogue from '../CategoriesCatalogue';
import CustomModal from '../CustomModal';
import ProjectsCatalogue from '../ProjectsCatalogue';
import ProjectPage from '../ProjectsPage';

const store = setupStore();

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Box component="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/catalogue" element={<CategoriesCatalogue />} />
            <Route path="/catalogue/:category" element={<ProjectsCatalogue />} />
            <Route path="/projects/:altName" element={<ProjectPage />} />
          </Routes>
        </Box>
        <Box component="footer" sx={{ backgroundColor: '#f7f6f5' }}>
          <Footer />
        </Box>
        <CustomModal />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
