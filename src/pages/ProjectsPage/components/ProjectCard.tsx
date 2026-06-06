import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { client } from '../../../api/client'
import projectLogo from '../../../assets/images/project-logo.jpg'

interface Project {
  id: string
  name: string
  description: string
  peopleCount: number
  activeTasks: number
}

interface ProjectCardProps {
  project: Project
  onDeleted: () => void
}

const ProjectCard = ({ project, onDeleted }: ProjectCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/sprint-board?projectId=${project.id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm(`Удалить проект «${project.name}»?`)) return
    try {
      await (client.DELETE as any)('/projects/{project_id}', {
        params: { path: { project_id: project.id } },
      })
      onDeleted()
    } catch (err) {
      console.error('Ошибка удаления проекта:', err)
    }
  }

  return (
    <Paper className='project-card' elevation={0} onClick={handleClick}>
      <Box className='project-top'>
        <Box className='project-logo-wrapper'>
          <Box component='img' src={projectLogo} alt='Project logo' className='project-logo' />
        </Box>

        <Box className='project-info'>
          <Typography className='project-name'>{project.name}</Typography>
          <Typography className='project-description'>{project.description}</Typography>
        </Box>

        <IconButton className='project-delete' aria-label='Удалить проект' onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <Box className='project-stats'>
        <Typography className='stat-item'>кол-во людей: {project.peopleCount}</Typography>
        <Typography className='stat-item'>активные задачи: {project.activeTasks}</Typography>
      </Box>
    </Paper>
  )
}

export default ProjectCard
