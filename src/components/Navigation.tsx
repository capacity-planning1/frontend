import React from 'react'

import { Link } from 'react-router-dom'

const Navigation: React.FC = () => {
  return (
    <nav style={{ padding: '20px', backgroundColor: 'lightgray' }}>
      <h3>Меню навигации</h3>
      <Link to='/'>Главная </Link>
      <Link to='/projects'>Проекты </Link>
      <Link to='/students'>Студенты </Link>
      <Link to='/profile'>Профиль </Link>
      <Link to='/teams'>Команды </Link>
      <Link to='/login'>Вход</Link>
    </nav>
  )
}

export default Navigation
