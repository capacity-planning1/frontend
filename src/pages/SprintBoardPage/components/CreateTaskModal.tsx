import { Box, Modal, TextField } from '@mui/material';

import './CreateTaskModal.scss';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; description: string; time: string; performer: string }) => void;
}

const CreateTaskModal = ({ open, onClose }: CreateTaskModalProps) => {
  return (
    <Modal open={open} onClose={onClose} className='create-task-modal'>
      <Box className='create-task-modal-container'>
        <Box className='form-row'>
          <span className='row-label'>Название задачи</span>
          <TextField className='row-input' size='small' />
        </Box>

        <Box className='form-row'>
          <span className='row-label'>Описание</span>
          <TextField className='row-input' size='small' />
        </Box>

        <Box className='form-row'>
          <span className='row-label'>Время</span>
          <TextField className='row-input' size='small' type='datetime-local' InputLabelProps={{ shrink: true }} />
        </Box>

        <Box className='form-row'>
          <span className='row-label'>Исполнитель</span>
          <TextField className='row-input' size='small' />
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;