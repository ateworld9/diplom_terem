import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AuthorizedHeader from './AuthorizedHeader';
import DefaultHeader from './DefaultHeader';

const Header: FC = () => {
  const { email } = useAppSelector((state) => state.userReducer.user);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'common.white' }}>
      <Container maxWidth="xl" sx={{ height: { xs: '90px', sm: '110px' } }}>
        <Toolbar>
          {email ? (
            <AuthorizedHeader />
          ) : (
            <DefaultHeader />
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
