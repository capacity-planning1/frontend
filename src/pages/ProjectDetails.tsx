import React from 'react'

import { useParams } from 'react-router-dom'

const ProjectDetail: React.FC = () => {
  const { id } = useParams()
  return <h2>Проект ID: {id}</h2>
}

export default ProjectDetail
