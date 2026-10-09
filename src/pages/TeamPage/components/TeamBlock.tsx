type Props = {
  name: string
  tasks: number
  img: string
}

const TeamBlock: React.FC<Props> = ({ name, tasks, img }) => {
  return (
    <div className='TeamPage-TeamBlock'>
      <div className='TeamPage-info'>
        <div className='content'>{name}</div>
        <div className='content'>Кол-во задач: {tasks}</div>
      </div>

      <img className='TeamPage-avatar' src={img} alt='картинка' />
    </div>
  )
}

export default TeamBlock
