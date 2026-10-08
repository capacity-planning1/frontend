type Props = {
  children: React.ReactNode
}

const TeamBlock: React.FC<Props> = ({ children }) => {
  return (
    <div className='TeamPage-TeamBlock'>
      <div className='TeamPage-info'>
        <div className='content'>Имя</div>
        <div className='content'>{children}</div>
      </div>

      <div className='TeamPage-avatar' />
    </div>
  )
}
export default TeamBlock
