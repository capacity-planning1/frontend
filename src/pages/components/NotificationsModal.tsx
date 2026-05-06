import { useState, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal, Typography, IconButton, List, ListItem, ListItemText, CircularProgress } from '@mui/material'

import './NotificationsModal.scss'

interface Notification {
  id: number
  title: string
  message: string
  date: string
  isRead: boolean
}

interface NotificationsModalProps {
  open: boolean
  onClose: () => void
}

const NotificationsModal = ({ open, onClose }: NotificationsModalProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      fetchNotifications()
    }
  }, [open])

  const fetchNotifications = async () => {
    setLoading(true)
    setError(null)

    try {
      // const response = await client.GET('/notifications')
      // setNotifications(response.data)

      // Пока пустой массив
      setNotifications([])
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
      setError('Не удалось загрузить уведомления')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      // await client.PATCH(`/notifications/${id}`, { is_read: true })

      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  if (loading) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        className='notifications-modal'
      >
        <Box className='notifications-modal-container'>
          <Box className='loading-container'>
            <CircularProgress />
            <Typography className='loading-text'>Загрузка уведомлений...</Typography>
          </Box>
        </Box>
      </Modal>
    )
  }

  if (error) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        className='notifications-modal'
      >
        <Box className='notifications-modal-container'>
          <Box className='error-container'>
            <Typography className='error-text'>{error}</Typography>
          </Box>
        </Box>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className='notifications-modal'
    >
      <Box className='notifications-modal-container'>
        <Box className='notifications-modal-header'>
          <Typography className='modal-title'>
            Уведомления
            {unreadCount > 0 && <span className='unread-badge'>{unreadCount}</span>}
          </Typography>
          <IconButton
            onClick={onClose}
            className='close-btn'
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List className='notifications-list'>
          {notifications.length === 0 ? (
            <Typography className='empty-text'>Нет уведомлений</Typography>
          ) : (
            notifications.map((notification) => (
              <ListItem
                key={notification.id}
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <ListItemText
                  primary={
                    <Box className='notification-header'>
                      <Typography className='notification-title'>{notification.title}</Typography>
                      <Typography className='notification-date'>{notification.date}</Typography>
                    </Box>
                  }
                  secondary={<Typography className='notification-message'>{notification.message}</Typography>}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Modal>
  )
}

export default NotificationsModal
