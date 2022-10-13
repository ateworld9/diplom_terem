import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProjectByAltName } from '../ProjectsCatalogue/ProjectsSlice';
import { Modals, modalSlice } from '../../components/CustomModal/ModalSlice';
import Complectation from './Complectation';

const ProjectPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { altName } = useParams();
  const { project } = useAppSelector((state) => state.projectsReducer);
  console.log(project?.imgPath);
  useEffect(() => {
    if (altName) {
      dispatch(fetchProjectByAltName(altName));
    }
  }, []);

  return (
    <Container component="section" maxWidth="xl" sx={{ mt: '180px', mb: '120px' }}>
      <Box display="flex" sx={{ flexDirection: 'column' }}>
        {project?.altName && (
        <Box>

          <img src={project.imgPath} alt={project.altName} style={{ width: '100%' }} />
          <div>
            <div>
              Скачать этот проект бесплатно
            </div>
            <div>
              Выберете в меню выше параметры поиска
            </div>
          </div>
          <div>
            <h2>
              Рекомендуемая планировка
            </h2>
            <p>
              Показана планировка дома Лидер 6. Изменить размер маожно в меню в правом углу
            </p>
            <div>
              <img src="/images/projects/lider61.png" alt="1" />
              <img src="/images/projects/lider62.png" alt="2" />
              <button type="button">
                Возможные пристройки
              </button>
            </div>
            <div>
              <h2>
                Комплектация дома
              </h2>
              <p>
                <span>
                  Дом сдается в чистовой отделке
                </span>
                <br />
                Сразу после завершения строительства можно обустроить мебелью
              </p>
            </div>
          </div>
          <Complectation />

        </Box>
        ) }
        <Button variant="contained" onClick={() => dispatch(modalSlice.actions.handleModalOpen(Modals.BuyForm))}>
          Оставить Заявку
        </Button>
      </Box>

    </Container>

  );
};

export default ProjectPage;
