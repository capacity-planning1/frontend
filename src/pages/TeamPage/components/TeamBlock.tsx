type Props = {
  children: React.ReactNode
}

const TeamBlock: React.FC<Props> = ({ children }) => {
  return (
    <div className='TeamPage-TeamBlock'>
      <div className='content'>{children}</div>

      <div className='TeamPage-avatar' />
    </div>
  )
}

export default TeamBlock
