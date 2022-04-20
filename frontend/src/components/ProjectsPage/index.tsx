import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProjectByAltName } from '../ProjectsCatalogue/ProjectsSlice';
import { Modals, modalSlice } from '../CustomModal/ModalSlice';

const ProjectPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { altName } = useParams();

  const { project } = useAppSelector((state) => state.projectsReducer);

  useEffect(() => {
    if (altName) {
      dispatch(fetchProjectByAltName(altName));
    }
  }, []);
  return (
    <Container component="section" maxWidth="xl" sx={{ mt: '180px', mb: '120px' }}>
      <Box display="flex" sx={{ flexDirection: 'column' }}>

        {project.altName && project.projectName }
        <Button variant="contained" onClick={() => dispatch(modalSlice.actions.handleModalOpen(Modals.BuyForm))}>
          Оставить Заявку
        </Button>
      </Box>

    </Container>

  );
};

export default ProjectPage;
