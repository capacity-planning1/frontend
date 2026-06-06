import { useState, useEffect, useCallback } from 'react'

import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { client } from '../../api/client'
import AppHeader from '../components/AppHeader'

import CreateTaskModal from './components/CreateTaskModal'
import InviteMemberModal from './components/InviteMemberModal'
import TaskColumn from './components/TaskColumn'
import WorkloadConfigModal from './components/WorkloadConfigModal'
import '../components/AppHeader.scss'
import './SprintBoard.scss'

interface Task {
  id: string
  number: string
  assignee: string
  status: string
  sprintId: string | null
  description: string | null
  priority: string
}

// Реальный ответ бэка (устаревшая schema.ts не совпадает — типизируем вручную).
// Реальный enum статусов: open|in_progress|review|testing|done; priority — строка LOW|MEDIUM|HIGH
interface ApiTask {
  id: string
  title: string
  status: string
  sprint_id?: string | null
  description?: string | null
  priority?: string
}

const SprintBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isWorkloadConfigOpen, setIsWorkloadConfigOpen] = useState(false)
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId') || ''

  const fetchTasks = useCallback(async () => {
    if (!projectId) {
      setLoading(false)
      return
    }
    try {
      // Имена исполнителей: project_member_id -> имя студента
      const [mRes, sRes] = await Promise.all([
        (client.GET as any)('/projects/{project_id}/members/', { params: { path: { project_id: projectId } } }),
        (client.GET as any)('/students/', { params: { query: { page_size: 100 } } }),
      ])
      const nameById = new Map<string, string>(
        ((sRes?.data?.items ?? []) as any[]).map((s) => [s.id, `${s.first_name} ${s.last_name}`]),
      )
      const memberName = new Map<string, string>(
        ((mRes?.data?.items ?? []) as any[]).map((m) => [m.id, nameById.get(m.student_id) ?? 'Участник']),
      )

      const res = await (client.GET as any)('/projects/{project_id}/sprints/tasks/', {
        params: { path: { project_id: projectId } },
      })
      if (res?.error) {
        setError('Ошибка загрузки задач')
        return
      }
      const items: ApiTask[] = res?.data?.items ?? []
      const withAssignee = await Promise.all(
        items.map(async (t) => {
          let assignee = '—'
          try {
            const a = await (client.GET as any)('/projects/{project_id}/sprints/tasks/{task_id}/assignments/', {
              params: { path: { project_id: projectId, task_id: String(t.id) } },
            })
            const first = a?.data?.items?.[0]
            if (first) assignee = memberName.get(first.project_member_id) ?? '—'
          } catch {
            // назначений нет / эндпоинт недоступен — оставляем '—'
          }
          return {
            id: String(t.id),
            number: t.title,
            assignee,
            status: t.status,
            sprintId: t.sprint_id ?? null,
            description: t.description ?? null,
            priority: t.priority ?? 'MEDIUM',
          }
        }),
      )
      setTasks(withAssignee)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // На бэке задача обязана принадлежать спринту — берём первый или создаём
  const ensureSprint = async (): Promise<string | null> => {
    const res = await (client.GET as any)('/projects/{project_id}/sprints/', {
      params: { path: { project_id: projectId } },
    })
    const items = res?.data?.items ?? []
    if (items.length > 0) return items[0].id
    const start = new Date()
    const end = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    const created = await (client.POST as any)('/projects/{project_id}/sprints/', {
      params: { path: { project_id: projectId } },
      body: {
        project_id: projectId,
        name: 'Спринт 1',
        start_date: start.toISOString().slice(0, 10),
        end_date: end.toISOString().slice(0, 10),
      },
    })
    return created?.data?.id ?? null
  }

  const handleCreateTask = () => setIsCreateTaskOpen(true)

  const submitTask = async ({
    title,
    description,
    projectMemberId,
  }: {
    title: string
    description: string
    projectMemberId: string
  }) => {
    if (!projectId) return
    const sprintId = await ensureSprint()
    if (!sprintId) return
    const created = await (client.POST as any)('/projects/{project_id}/sprints/tasks/', {
      params: { path: { project_id: projectId } },
      body: {
        project_id: projectId,
        sprint_id: sprintId,
        title,
        description: description || null,
        status: 'open',
      },
    })
    // Назначаем исполнителя, если выбран
    const taskId = created?.data?.id
    if (taskId && projectMemberId) {
      try {
        await (client.POST as any)('/projects/{project_id}/sprints/tasks/{task_id}/assignments/', {
          params: { path: { project_id: projectId, task_id: taskId } },
          body: { project_task_id: taskId, project_member_id: projectMemberId },
        })
      } catch {
        // не критично для создания задачи
      }
    }
    fetchTasks()
  }

  const handleInvite = () => setIsInviteOpen(true)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const taskId = String(active.id)
    const newStatus = String(over.id)
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.status === newStatus) return

    const prevStatus = task.status
    // Оптимистично переставляем задачу в новую колонку
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))

    try {
      await (client.PUT as any)('/projects/{project_id}/sprints/tasks/{task_id}', {
        params: { path: { project_id: projectId, task_id: taskId } },
        body: {
          sprint_id: task.sprintId,
          title: task.number,
          description: task.description,
          status: newStatus,
          priority: task.priority,
        },
      })
    } catch {
      // Откат + перезагрузка при ошибке
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: prevStatus } : t)))
      fetchTasks()
    }
  }

  const handleLoadConfig = () => {
    setIsWorkloadConfigOpen(true)
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const getButtonHandler = (columnId: string) => {
    if (columnId === 'open') return handleCreateTask
    if (columnId === 'in_progress') return handleInvite
    if (columnId === 'review') return handleLoadConfig
    return undefined
  }

  // Реальный enum статусов задачи на бэке: open|in_progress|review|testing|done
  const columns = [
    { id: 'open', title: 'Открыто', hasButton: true, buttonText: 'Создать задачу' },
    { id: 'in_progress', title: 'В работе', hasButton: true, buttonText: 'Пригласить' },
    { id: 'review', title: 'Ревью', hasButton: true, buttonText: 'Настроить нагрузку' },
    { id: 'testing', title: 'Тестирование', hasButton: false, buttonText: '' },
    { id: 'done', title: 'Выполнено', hasButton: false, buttonText: '' },
  ]

  if (loading) {
    return (
      <Box className='sprint-board-page'>
        <AppHeader />
        <Box className='sprint-board-content'>
          <Box className='loading-container'>
            <CircularProgress />
            <Typography className='loading-text'>Загрузка задач...</Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className='sprint-board-page'>
        <AppHeader />
        <Box className='sprint-board-content'>
          <Box className='error-container'>
            <Typography className='error-text'>Ошибка: {error}</Typography>
            <Button variant='outlined' onClick={() => fetchTasks()}>
              Попробовать снова
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className='sprint-board-page'>
      <AppHeader />
      <Box className='sprint-board-content'>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Box className='columns-wrapper'>
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={getTasksByStatus(column.id)}
                hasButton={column.hasButton}
                buttonText={column.buttonText}
                onButtonClick={getButtonHandler(column.id)}
              />
            ))}
          </Box>
        </DndContext>
      </Box>
      <WorkloadConfigModal open={isWorkloadConfigOpen} onClose={() => setIsWorkloadConfigOpen(false)} />
      <CreateTaskModal
        open={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        projectId={projectId}
        onCreate={submitTask}
      />
      <InviteMemberModal open={isInviteOpen} onClose={() => setIsInviteOpen(false)} projectId={projectId} />
    </Box>
  )
}

export default SprintBoard
