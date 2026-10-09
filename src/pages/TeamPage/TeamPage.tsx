import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import './TeamPage.scss'

import TeamBlock from './components/TeamBlock'

const TeamPage: React.FC = () => {
  //тут список участников команды
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Денис',
      tasks: 8,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8LnP94D6fAj3iAA0FtwvjcYHDo4S91HLeLtKktGebQ&s=10',
    },
    {
      id: 2,
      name: 'Кирилл',
      tasks: 5,
      img: 'https://s.auto.drom.ru/i24207/c/photos/fullsize/toyota/rav4/toyota_rav4_699724.jpg',
    },
    {
      id: 3,
      name: 'Глеб',
      tasks: 12,
      img: 'https://webcalypt.cloud/img/thumb/lg/110382/20266/Elfp8XDuYDExgwAhhTSBEE3x9mHtiPS9a99pxq19POMZmgGHKODoNkbmRrLFW1pNVeHEiG5MrLr2BWYAhFYxEPMBe5dAzNlulFoL44UaR9ss3QQc1rAyBC97O564LMwN.jpeg.jpg',
    },
  ])

  //поля формы что типок вводит
  const [name, setName] = useState('')
  const [tasks, setTasks] = useState('')
  const [img, setImg] = useState('')

  //тут добавляем нового участника
  const addMember = (e: any) => {
    e.preventDefault() // чтобы страница не перезагружалась

    //берем старый список и добавляем нового
    setMembers([
      ...members,
      {
        id: members.length + 1, //просто следующий номер
        name: name,
        tasks: Number(tasks), //из строки в число
        //если ссылку не ввели то ставим дефолт картинку))
        img: img || 'https://miro.medium.com/1*Bvkn3ol6fCOuzAM42B2Afw.jpeg',
      },
    ])

    //чистим форму после добавления
    setName('')
    setTasks('')
    setImg('')
  }

  return (
    <section className='TeamPage-Section'>
      <nav className='TeamPage-Nav'>
        {/*шапка на всю ширину*/}
        <div className='TeamPage-Nav-logo'></div>
        <div className='TeamPage-Nav-links'>
          <Link to='/projects'>Мои проекты</Link>
          <Link to='/tasks'>Мои задачи</Link>
        </div>
        <Link to='/login' className='TeamPage-Nav-exit'>
          Выйти
        </Link>
      </nav>

      <h1 className='TeamPage-Title'>Загруженность команды</h1>

      <section className='TeamPage-Field_block'>
        {/*тут карточки участников*/}
        <div className='TeamPage-Grid'>
          {members.map((m) => (
            //здесь ставим пользователя
            <TeamBlock key={m.id} name={m.name} tasks={m.tasks} img={m.img} />
          ))}
        </div>
      </section>

      {/*форма для создания нового участника*/}
      <form className='TeamPage-Form' onSubmit={addMember}>
        <h3>Добавить участника</h3>
        <input type='text' placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='number' placeholder='Кол-во задач' value={tasks} onChange={(e) => setTasks(e.target.value)} />
        <input type='text' placeholder='Ссылка на фото' value={img} onChange={(e) => setImg(e.target.value)} />
        <button type='submit'>Создать</button>
      </form>
    </section>
  )
}

export default TeamPage
