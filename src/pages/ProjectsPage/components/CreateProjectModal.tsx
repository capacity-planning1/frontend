import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal, Typography, IconButton, TextField, Button } from '@mui/material'

import './CreateProjectModal.scss'

interface CreateProjectModalProps {
  open: boolean
  onClose: () => void
  onCreate?: (projectData: { name: string; description: string; logo?: File }) => void
}

const CreateProjectModal = ({ open, onClose, onCreate }: CreateProjectModalProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const previewUrl = URL.createObjectURL(file)
      setLogoPreview(previewUrl)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const description = formData.get('description') as string

    if (name && name.trim()) {
      onCreate?.({ name, description, logo: logoFile || undefined })
      onClose()
      setLogoPreview(null)
      setLogoFile(null)
      event.currentTarget.reset()
    }
  }

  const handleClose = () => {
    onClose()
    setLogoPreview(null)
    setLogoFile(null)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className='create-project-modal'
    >
      <Box className='create-project-modal-container'>
        <Box className='create-project-modal-header'>
          <Typography className='modal-title'>Создать проект</Typography>
          <IconButton
            onClick={handleClose}
            className='close-btn'
            aria-label='Закрыть'
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form
          onSubmit={handleSubmit}
          className='create-project-form'
        >
          <Box className='form-row'>
            <Box className='logo-upload'>
              <input
                type='file'
                accept='image/*'
                id='logo-upload'
                style={{ display: 'none' }}
                onChange={handleLogoChange}
              />
              <label htmlFor='logo-upload'>
                <Box className='logo-preview'>
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt='Project logo preview'
                      className='preview-image'
                    />
                  ) : (
                    <Typography className='upload-text'>Логотип проекта</Typography>
                  )}
                </Box>
              </label>
            </Box>

            <TextField
              name='name'
              label='Название проекта'
              className='project-name-field'
              required
              fullWidth
            />
          </Box>

          <TextField
            name='description'
            label='Описание проекта'
            className='project-description-field'
            multiline
            rows={6}
            fullWidth
          />

          <Box className='modal-actions'>
            <Button
              type='submit'
              variant='contained'
              className='submit-btn'
            >
              Создать проект
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default CreateProjectModal
