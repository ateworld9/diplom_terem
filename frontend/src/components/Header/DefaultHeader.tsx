import { FC } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Logo from './Logo';
import { useAppDispatch } from '../../hooks/redux';
import { modalSlice, Modals } from '../CustomModal/ModalSlice';

const pages = [{ page: 'КАТАЛОГ', link: '/catalogue' }, { page: 'НОВАЯ КОЛЛЕКЦИЯ', link: '/' }];

const DefaultHeader: FC = () => {
  const dispatch = useAppDispatch();
  return (
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
  );
};

export default DefaultHeader;
