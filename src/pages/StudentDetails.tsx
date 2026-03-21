import React from 'react'

import { useParams } from 'react-router-dom'

const StudentDetail: React.FC = () => {
  const { id } = useParams()
  return <h2>Студент ID: {id}</h2>
}

export default StudentDetail
