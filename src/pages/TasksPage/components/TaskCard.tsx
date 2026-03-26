import { Box, Paper, Button, Typography } from '@mui/material';
import projectLogo from '../pics/project-logo.jpg';
import '../MyTasks.scss';

interface Task {
  id: number;
  title: string;
  description: string;
  remainingTime: string;
  plannedTime: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Paper className="task-card" elevation={0}>
      <Box className="task-avatar">
        <Box
          component="img"
          src={projectLogo}
          alt="Project logo"
          className="project-logo"
        />
      </Box>

      <Box className="task-info">
        <Typography className="task-title">{task.title}</Typography>
        <Typography className="task-description">{task.description}</Typography>
        <Typography className="task-time">
          Кол-во оставшегося времени / кол-во запланированного времени
        </Typography>
        <Typography className="task-time-values">
          {task.remainingTime} / {task.plannedTime}
        </Typography>
      </Box>

      <Box className="task-actions">
        <Button variant="outlined" size="small" className="action-btn">
          принять задачу
        </Button>
        <Button variant="outlined" size="small" className="action-btn">
          запросить переназначение
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskCard;