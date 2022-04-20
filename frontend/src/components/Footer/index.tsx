import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const catalogue = ['Каркасные дома', 'Дома из бруса', 'Одноэтажные дома', 'Двухэтажные дома', 'Современные дома', 'Беседки', 'Бани', 'Дачные дома', 'Коттеджи', 'Премиум'];
const information = ['О компании', 'Производство', 'Прайс-лист', 'Полезная информация', 'Строительство домов в Московской области'];
const news = ['Акции', 'Отзывы', 'Видеоотзывы', 'Жизнь компании'];

interface IListHeader {
  name: string;
}

const ListHeader: React.FC<IListHeader> = ({ name }) => (
  <Typography
    component="li"
    sx={{
      m: '33px 0 17px',
      fontSize: '16px',
      fontWeight: 600,
      listStyle: 'none outside none',
    }}
  >
    {name}
  </Typography>
);

interface IListElement {
  name: string;
}
const ListElement: React.FC<IListElement> = ({ name }) => (
  <Typography
    component="li"
    sx={{
      m: '0 0 8px',
      fontSize: '14px',
      fontWeight: 400,
      borderBottom: '1px solid #a32829',
      listStyle: 'none outside none',
      maxWidth: '145px',
    }}
  >
    {name}
  </Typography>
);

const Footer: React.FC = () => (
  <Box component="nav" display="flex">
    <Box component="ul" sx={{ width: '25%' }}>
      <ListHeader name="Каталог" />
      {catalogue.map((el) => (<ListElement key={el} name={el} />))}
    </Box>
    <Box component="ul" sx={{ width: '25%' }}>
      <ListHeader name="Информация" />
      {information.map((el) => (<ListElement key={el} name={el} />))}
    </Box>
    <Box component="ul" sx={{ width: '25%' }}>
      <ListHeader name="Новости" />
      {news.map((el) => (<ListElement key={el} name={el} />))}
    </Box>
  </Box>
);

export default Footer;
