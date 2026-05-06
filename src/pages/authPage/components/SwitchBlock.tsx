import { Button, Typography } from '@mui/material'

interface SwitchBlockProps {
  tab: string
  message: string
  onClick: () => void
}

function SwitchBlock({ tab, message, onClick }: SwitchBlockProps) {
  return (
    <div className='switch-block'>
      <Typography className='switch-block__tab'>{tab}</Typography>

      <Typography className='switch-block__message'>{message}</Typography>

      <Button
        variant='text'
        className='switch-block__action'
        onClick={onClick}
      >
        Перейти
      </Button>
    </div>
  )
}
export default SwitchBlock
