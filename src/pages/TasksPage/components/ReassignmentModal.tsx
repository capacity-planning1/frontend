import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal, Typography, IconButton, TextField, Button } from '@mui/material'

import '../ReassignmentModal.scss'

interface ReassignmentModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (reason: string) => void
}

const ReassignmentModal = ({ open, onClose, onSubmit }: ReassignmentModalProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const reason = formData.get('reason') as string
    if (reason && reason.trim()) {
      onSubmit?.(reason)
      onClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className='reassignment-modal'
      aria-labelledby='reassignment-modal-title'
    >
      <Box className='reassignment-modal-container'>
        <Box className='reassignment-modal-header'>
          <Typography className='reason-label'>Укажите причину</Typography>
          <IconButton
            onClick={onClose}
            className='close-btn'
            aria-label='Закрыть'
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form
          onSubmit={handleSubmit}
          className='reassignment-form'
        >
          <TextField
            name='reason'
            multiline
            rows={10}
            placeholder=''
            className='reason-textfield'
            variant='outlined'
            required
          />

          <Box className='modal-actions'>
            <Button
              type='submit'
              variant='contained'
              className='submit-btn'
            >
              Отправить
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default ReassignmentModal
