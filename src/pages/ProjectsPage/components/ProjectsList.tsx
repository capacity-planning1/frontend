import { Box, Button } from '@mui/material'

import { Project } from '../Projects'

import ProjectCard from './ProjectCard'
import '../Projects.scss'

interface ProjectsListProps {
  projects: Project[]
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
    <Box className='projects-list'>
      <Box className='projects-grid'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Box className='create-project-card'>
          <Button className='create-project-text'>Создать проект</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectsList
