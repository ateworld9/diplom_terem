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
import MainPage from '../../pages/MainPage';
import CustomModal from '../CustomModal';
import CategoriesCatalogue from '../../pages/CategoriesCatalogue';
import ProjectsCatalogue from '../../pages/ProjectsCatalogue';
import ProjectPage from '../../pages/ProjectsPage';
import Task1Page from '../../pages/Task1Page';
import Task2Page from '../../pages/Task2Page';

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
            <Route path="/task1" element={<Task1Page />} />
            <Route path="/task2" element={<Task2Page />} />
            {/* <Route path="/task3" element={<Task1Page />} /> */}
            {/* <Route path="/task4" element={<Task1Page />} /> */}
            {/* <Route path="/spravochnik/:name" element={} /> */}
            {/* <Route path="/indocs/:name" element={} /> */}
            {/* <Route path="/outdocs/:name" element={} /> */}

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
