import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import './MyTasks.scss';
import AppHeader from '../components/AppHeader';
import '../components/AppHeader.scss';
import TasksList from './components/TasksList';
import { client } from '../../api/client';
import type { components } from '../../api/schema';

export interface Task {
  id: number;
  title: string;
  description: string;
  remainingTime: string;
  plannedTime: string;
}

// Мок-данные для времени
const mockTimeStats = [
  { remainingTime: '2 ч 15 мин', plannedTime: '4 ч 00 мин' },
  { remainingTime: '1 ч 30 мин', plannedTime: '3 ч 00 мин' },
  { remainingTime: '0 ч 45 мин', plannedTime: '2 ч 00 мин' },
  { remainingTime: '3 ч 00 мин', plannedTime: '5 ч 00 мин' },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await client.GET('/projects/{project_id}/tasks', {
          params: {
            path: {
              project_id: 1, // временно
            },
            query: {
              page: 1,
              page_size: 100,
            },
          },
        });

        if (response.error) {
          setError('Ошибка загрузки задач');
          console.error('API Error:', response.error);
        } else if (response.data) {
          const data = response.data as { 
            items: components['schemas']['ProjectTaskResponse'][]; 
            total: number; 
            page: number; 
            page_size: number 
          };
          
          const formattedTasks: Task[] = data.items.map((item, index) => ({
            id: item.id,
            title: item.title,
            description: item.description || 'Описание отсутствует',
            remainingTime: mockTimeStats[index].remainingTime,
            plannedTime: mockTimeStats[index].plannedTime,
          }));
          
          setTasks(formattedTasks);
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

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Box className="my-tasks-page">
        <AppHeader />
        <Box className="tasks-content">
          <Box className="loading-container">
            <CircularProgress />
            <Typography className="loading-text">Загрузка задач...</Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="my-tasks-page">
        <AppHeader />
        <Box className="tasks-content">
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
    );
  }

  return (
    <Box className="my-tasks-page">
      <AppHeader />
      <Box className="tasks-content">
        <TasksList tasks={tasks} />
      </Box>
    </Box>
  );
};

export default Tasks
