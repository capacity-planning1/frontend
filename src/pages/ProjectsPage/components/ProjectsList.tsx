import { useState } from 'react'

import { Box, Button } from '@mui/material'

import { client } from '../../../api/client'
import { Project } from '../Projects'

import CreateProjectModal from './CreateProjectModal'
import ProjectCard from './ProjectCard'
import '../Projects.scss'

interface ProjectsListProps {
  projects: Project[]
  onChanged: () => void
}

const ProjectsList = ({ projects, onChanged }: ProjectsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateProject = async (projectData: { name: string; description: string; logo?: File }) => {
    const ownerStudentId = localStorage.getItem('student_id')
    // owner_student_id отсутствует в устаревшей schema.ts — обходим типы
    const response = await (client.POST as any)('/projects/', {
      body: {
        name: projectData.name,
        description: projectData.description || null,
        owner_student_id: ownerStudentId,
      },
    })
    if (response?.error) {
      console.error('Ошибка создания проекта:', response.error)
    }
    handleCloseModal()
    onChanged()
  }

  return (
    <>
      <Box className='projects-list'>
        <Box className='projects-grid'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDeleted={onChanged} />
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
