import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Container, Grid, Typography } from '@mui/material';
import { fetchProjectsByName } from './ProjectsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// const projectsMock = [
//   {
//     name: 'Премиум', altName: 'premium', priceFrom: '7 332 000', imgPath: 'images/catalogue/Premium.jpg',
//   },
//   {
//     name: 'Коттеджи', altName: 'kottedzhi', priceFrom: '3 203 000', imgPath: 'images/catalogue/Kotedge.jpg',
//   },
//   {
//     name: 'Современные дома', altName: 'sovremennie-doma', priceFrom: '2 085 000', imgPath: 'images/catalogue/sovremennie_doma.jpg',
//   },
//   {
//     name: 'Небольшие коттеджи', altName: 'nebolshie-kottedzhi', priceFrom: '2 480 000', imgPath: 'images/catalogue/little_kotedge.jpeg',
//   },
//   {
//     name: 'Дачные дома', altName: 'dachnye-doma', priceFrom: '511 000', imgPath: 'images/catalogue/dachi.jpg',
//   },
//   {
//     name: 'Бани', altName: 'bani', priceFrom: '580 000', imgPath: 'images/catalogue/bani.jpg',
//   },
//   {
//     name: 'Одноэтажные дома', altName: 'odnoetazhnye-doma', priceFrom: '322 000', imgPath: 'images/catalogue/1level.jpg',
//   },
//   {
//     name: 'Двухэтажные дома', altName: 'dvukhetazhnye-doma', priceFrom: ' 3 803 000', imgPath: 'images/catalogue/2level.jpg',
//   },
//   {
//     name: 'Проекты с мансардой', altName: 'proekty-s-mansardoy', priceFrom: '1 200 000', imgPath: 'images/catalogue/with_mansarda.jpg',
//   },
// ];

const ProjectsCatalogue: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projects = useAppSelector((state) => state.projectsReducer.projects);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (params.category) {
      dispatch(fetchProjectsByName(params.category));
    }
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ mt: '180px', mb: '120px' }}>
      <Typography
        component="h1"
        sx={{
          ml: '30px', pb: '15px', fontSize: '36px', fontWeight: '700', color: '#121212', lineHeight: '1.35',
        }}
      >
        Каталог
      </Typography>
      <Grid container>
        {projects.map(({
          projectId, projectName, altName, price, imgPath,
        }) => (
          <Grid key={projectName + projectId} item xs={4} pb="66px" pl="30px">
            <Link to={`/projects/${altName}`}>
              <Box
                mb="7px"
              >
                <img src={imgPath} alt={altName} style={{ width: '100%' }} />
              </Box>
            </Link>
            <Box display="flex">
              <Link to={`/projects/${altName}`} style={{ textDecoration: 'none' }}>
                <Typography color="#404040" sx={{ font: 'normal 600 18px/24px "Montserrat", sans-serif' }}>
                  {projectName}
                </Typography>
              </Link>
              <Box ml="auto">
                <Typography
                  component="span"
                  color="#404040"
                  sx={{
                    font: 'normal 400 14px/24px "IBM Plex Sans", sans-serif', backgroundColor: '#f9f9f9', borderRadius: '100px', padding: '3px 10px',
                  }}
                >
                  от
                  {' '}
                  {price}
                  {' '}
                  ₽
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}

      </Grid>
    </Container>
  );
};

export default ProjectsCatalogue;
