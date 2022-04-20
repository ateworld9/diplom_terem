import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Logo from './Logo';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchLogout } from '../../store/reducers/ActionCreators';
import { modalSlice, Modals } from '../CustomModal/ModalSlice';

const pages = [{ page: 'КАТАЛОГ', link: '/catalogue' }, { page: 'НОВАЯ КОЛЛЕКЦИЯ', link: '/' }];
const authenticatedPages = [{ page: 'Задача 1', link: '/task1' }, { page: 'Задача 2', link: '/task2' }, { page: 'Задача 3', link: '/task3' }, { page: 'Задача 4', link: '/task4' }];

const Header:React.FC = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.userReducer.user);
  const handleLogout = () => {
    dispatch(fetchLogout());
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'common.white' }}>
      <Container maxWidth="xl" sx={{ height: { xs: '90px', sm: '110px' } }}>
        <Toolbar>
          {email ? (
            <>
              <Box sx={{ height: { xs: '90px', sm: '110px' }, mr: 2 }}>
                <Link to="/">
                  <Logo />
                </Link>
              </Box>
              <Box sx={{ display: 'flex' }}>
                {authenticatedPages.map(({ page, link }) => (
                  <Button
                    key={page}
                    component={Link}
                    to={link}
                    sx={{
                      my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', ml: 'auto' }}>
                <Button
                  onClick={handleLogout}
                  sx={{
                    my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
                  }}
                >
                  Выход
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ height: { xs: '90px', sm: '110px' }, mr: 2 }}>
                <Link to="/">
                  <Logo />
                </Link>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Button sx={{
                  my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
                }}
                >
                  МЕНЮ
                </Button>
                {pages.map(({ page, link }) => (
                  <Button
                    key={page}
                    component={Link}
                    to={link}
                    sx={{
                      my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', ml: 'auto' }}>
                <Button
                  onClick={() => dispatch(modalSlice.actions.handleModalOpen(Modals.Login))}
                  sx={{
                    my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
                  }}
                >
                  Авторизация
                </Button>
              </Box>
            </>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
