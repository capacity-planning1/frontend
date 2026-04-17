import { Box, Paper, Typography } from '@mui/material'

import projectLogo from '../../../assets/images/project-logo.jpg'

interface Project {
  id: number
  name: string
  description: string
  peopleCount: number
  activeTasks: number
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Paper className='project-card' elevation={0}>
      <Box className='project-top'>
        <Box className='project-logo-wrapper'>
          <Box component='img' src={projectLogo} alt='Project logo' className='project-logo' />
        </Box>

        <Box className='project-info'>
          <Typography className='project-name'>{project.name}</Typography>
          <Typography className='project-description'>{project.description}</Typography>
        </Box>
      </Box>

      <Box className='project-stats'>
        <Typography className='stat-item'>кол-во людей: {project.peopleCount}</Typography>
        <Typography className='stat-item'>активные задачи: {project.activeTasks}</Typography>
      </Box>
    </Paper>
  )
}

export default ProjectCard
