import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Menu, MenuItem } from '@mui/material';
import Logo from './Logo';
import { useAppDispatch } from '../../hooks/redux';
import { fetchLogout } from '../../store/reducers/ActionCreators';

const authenticatedPages = [{ page: 'Формирование недельных планов работы цехов', link: '/task1' }, { page: 'Определение потребности в сырье для производства ', link: '/task2' }, { page: 'Контроль выполнения недельных планов работы цехов', link: '/task3' }, { page: 'Определение потребности в новом оборудовании', link: '/task4' }];
const directoriesPages = [
  { page: 'Справочник цехов', link: '/spravochnik/manufactories' },
  { page: 'Реестр спецификаций проектов', link: '/spravochnik/specifications' },
  { page: 'Ведомость производимых цехом изделий', link: '/spravochnik/manufactories_produce_products' },
];
const indocsPages = [
  { page: 'Реестр договоров на строительство объекта деревянного строительства', link: '/indocs/orders' },
];
const AuthorizedHeader: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenu = (link: string) => {
    navigate(link);
    handleClose();
  };
  const handleLogout = () => {
    dispatch(fetchLogout());
  };
  return (
    <>
      <Box sx={{ height: { xs: '90px', sm: '110px' }, mr: 2 }}>
        <Link to="/">
          <Logo />
        </Link>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Button
          id="directory-button"
          aria-controls={anchorEl?.id === 'directory-button' ? 'directory-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl?.id === 'directory-button' ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
          }}
        >
          Справочники
        </Button>
        <Menu
          id="directory-menu"
          anchorEl={anchorEl}
          open={anchorEl?.id === 'directory-button'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'directory-button',
          }}
        >
          {directoriesPages.map(({ page, link }) => (
            <MenuItem key={page} onClick={() => { handleClickMenu(link); }}>
              {page}
            </MenuItem>
          ))}
        </Menu>

        <Button
          id="indocs-button"
          aria-controls={anchorEl?.id === 'indocs-button' ? 'indocs-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl?.id === 'indocs-button' ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
          }}
        >
          Входные документы
        </Button>
        <Menu
          id="indocs-menu"
          anchorEl={anchorEl}
          open={anchorEl?.id === 'indocs-button'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'indocs-button',
          }}
        >
          {indocsPages.map(({ page, link }) => (
            <MenuItem key={page} onClick={() => { handleClickMenu(link); }}>
              {page}
            </MenuItem>
          ))}
        </Menu>

        <Button
          id="tasks-button"
          aria-controls={anchorEl?.id === 'tasks-button' ? 'tasks-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl?.id === 'tasks-button' ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            my: 2, mx: 4, display: 'block', color: 'common.black', fontSize: '17px',
          }}
        >
          Задачи
        </Button>
        <Menu
          id="tasks-menu"
          anchorEl={anchorEl}
          open={anchorEl?.id === 'tasks-button'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'tasks-button',
          }}
        >
          {authenticatedPages.map(({ page, link }) => (
            <MenuItem key={page} onClick={() => { handleClickMenu(link); }}>
              {page}
            </MenuItem>
          ))}
        </Menu>

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
  );
};

export default AuthorizedHeader;
