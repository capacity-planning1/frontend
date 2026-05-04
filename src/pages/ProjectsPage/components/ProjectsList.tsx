import { useState } from 'react'

import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Project } from '../Projects'

import CreateProjectModal from './CreateProjectModal'
import ProjectCard from './ProjectCard'
import '../Projects.scss'

interface ProjectsListProps {
  projects: Project[]
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateProject = (projectData: { name: string; description: string; logo?: File }) => {
    console.log('Создание проекта:', projectData)
    const newProjectId = 1 // пока что
    navigate(`/sprint-board?projectId=${newProjectId}`)
    handleCloseModal()
  }

  return (
    <>
      <Box className='projects-list'>
        <Box className='projects-grid'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <Box className='create-project-card' onClick={handleOpenModal}>
            <Button className='create-project-text'>Создать проект</Button>
          </Box>
        </Box>
      </Box>

      <CreateProjectModal open={isModalOpen} onClose={handleCloseModal} onCreate={handleCreateProject} />
    </>
  )
}

export default ProjectsList
