import { useState, useEffect } from 'react';
import { Box, Paper, Button, ThemeProvider, CircularProgress, Typography } from '@mui/material';
import { theme } from '../../styles/theme';
import './Projects.scss';
import appLogo from '../../assets/images/app-logo.jpg';
import ProjectsList from './components/ProjectsList';
import { client } from '../../api/client';

export interface Project {
  id: number;
  name: string;
  description: string;
  peopleCount: number;
  activeTasks: number;
}

// Интерфейс для ответа от API
interface ProjectFromAPI {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  owner_student_id: number;
}

// Мок-данные для людей и задач
const MOCK_PEOPLE_COUNT = 5;
const MOCK_ACTIVE_TASKS = 3;

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await client.GET('/projects', {
          params: {
            query: {
              page: 1,
              page_size: 100,
            },
          },
        });

        if (response.error) {
          setError('Ошибка загрузки проектов');
          console.error('API Error:', response.error);
        } else if (response.data) {
          const data = response.data as { items: ProjectFromAPI[]; total: number; page: number; page_size: number };
          
          // Преобразуем данные из API в формат для карточек
          // Добавляем мок-данные для peopleCount и activeTasks
          const formattedProjects: Project[] = data.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description || 'Описание отсутствует',
            peopleCount: MOCK_PEOPLE_COUNT,
            activeTasks: MOCK_ACTIVE_TASKS,
          }));
          
          setProjects(formattedProjects);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Состояние загрузки
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box className="my-projects-page">
          <Paper className="projects-header" elevation={0} square sx={{ borderRadius: 0 }}>
            <Box className="header-left">
              <Box className="header-avatar">
                <Box component="img" src={appLogo} alt="Header logo" className="header-logo" />
              </Box>
              <Box className="projects-tabs">
                <Button className="projects-tab active" disableRipple sx={{ textTransform: 'none' }}>
                  Мои проекты
                </Button>
                <Button className="projects-tab" disableRipple sx={{ textTransform: 'none' }}>
                  Мои задачи
                </Button>
              </Box>
            </Box>
            <Button className="projects-logout" disableRipple sx={{ textTransform: 'none' }}>
              Выйти
            </Button>
          </Paper>
          <Box className="projects-content">
            <Box className="loading-container">
              <CircularProgress />
              <Typography className="loading-text">Загрузка проектов...</Typography>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box className="my-projects-page">
          <Paper className="projects-header" elevation={0} square sx={{ borderRadius: 0 }}>
            <Box className="header-left">
              <Box className="header-avatar">
                <Box component="img" src={appLogo} alt="Header logo" className="header-logo" />
              </Box>
              <Box className="projects-tabs">
                <Button className="projects-tab active" disableRipple sx={{ textTransform: 'none' }}>
                  Мои проекты
                </Button>
                <Button className="projects-tab" disableRipple sx={{ textTransform: 'none' }}>
                  Мои задачи
                </Button>
              </Box>
            </Box>
            <Button className="projects-logout" disableRipple sx={{ textTransform: 'none' }}>
              Выйти
            </Button>
          </Paper>
          <Box className="projects-content">
            <Box className="error-container">
              <Typography className="error-text">Ошибка: {error}</Typography>
              <Button 
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                Попробовать снова
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="my-projects-page">
        <Paper className="projects-header" elevation={0} square sx={{ borderRadius: 0 }}>
          <Box className="header-left">
            <Box className="header-avatar">
              <Box
                component="img"
                src={appLogo}
                alt="Header logo"
                className="header-logo"
              />
            </Box>
            <Box className="projects-tabs">
              <Button
                className="projects-tab active"
                disableRipple
                sx={{ textTransform: 'none' }}
              >
                Мои проекты
              </Button>
              <Button
                className="projects-tab"
                disableRipple
                sx={{ textTransform: 'none' }}
              >
                Мои задачи
              </Button>
            </Box>
          </Box>
          <Button
            className="projects-logout"
            disableRipple
            sx={{ textTransform: 'none' }}
          >
            Выйти
          </Button>
        </Paper>

        <Box className="projects-content">
          <ProjectsList projects={projects} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Projects;