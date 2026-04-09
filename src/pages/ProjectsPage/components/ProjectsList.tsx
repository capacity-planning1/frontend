import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import { Project } from '../Projects';
import '../Projects.scss';

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
    <Box className="projects-list">
      <Box className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Box className="create-project-card">
          <span className="create-project-text">Создать проект</span>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectsList;