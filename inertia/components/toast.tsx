import { useEffect, useRef, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import type { SharedProps } from '@adonisjs/inertia/types'

type Toast = {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

function Toast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const { flash } = usePage<SharedProps>().props

  useEffect(() => {
    if (!Object.keys(flash).length) return

    if (flash.success) {
      addToast({ type: 'success', message: flash.success })
    }

    if (flash.error) {
      addToast({ type: 'error', message: flash.error })
    }

    if (flash.info) {
      addToast({ type: 'info', message: flash.info })
    }
  }, [flash])

  function addToast({ type, message }: Omit<Toast, 'id'>) {
    setToasts([{ id: Date.now(), type, message }])
  }

  function removeToast() {
    setToasts([])
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 transform flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

type ToastItemProps = {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
  removeToast(): void
}

function ToastItem({ type, message, duration = 10000, removeToast }: ToastItemProps) {
  const [progress, setProgress] = useState(100)
  const [paused, setPaused] = useState(false)
  const startTime = useRef(Date.now())
  const interval = useRef<any>(null)

  useEffect(() => {
    if (paused) return

    interval.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current
      const newProgress = 100 - (elapsed / duration) * 100

      newProgress <= 0 ? removeToast() : setProgress(newProgress)
    }, 100)

    return () => clearInterval(interval.current)
  }, [paused])

  function handleMouseEnter() {
    setPaused(true)
  }

  function handleMouseLeave() {
    setPaused(false)
    startTime.current = Date.now() - (100 - progress) * (duration / 100)
  }

  const icon = {
    success: 'heroicons:check-circle',
    error: 'heroicons:exclamation-circle',
    info: 'heroicons:information-circle',
  }[type]

  const toastClass = {
    success: 'border-emerald-300 bg-emerald-100 text-emerald-600',
    error: 'border-red-300 bg-red-100 text-red-600',
    info: 'border-sky-300 bg-sky-100 text-sky-600',
  }[type]

  const progressBarClass = {
    success: 'bg-emerald-300',
    error: 'bg-red-300',
    info: 'bg-sky-300',
  }[type]

  const progressBarBackgroundClass = {
    success: 'bg-emerald-200',
    error: 'bg-red-200',
    info: 'bg-sky-200',
  }[type]

  return (
    <motion.div
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.95 }}
      className={clsx(
        'flex flex-col items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm',
        toastClass
      )}
    >
      <div className="flex items-center gap-4">
        <Icon icon={icon} className="size-6 shrink-0" />
        <span>{message}</span>
        <Icon
          icon="heroicons:x-circle"
          className="size-6 shrink-0 cursor-pointer opacity-50 transition hover:opacity-100"
          onClick={() => removeToast()}
        />
      </div>
      <div className={clsx('relative h-1.5 w-full rounded', progressBarBackgroundClass)}>
        <div
          className={clsx('absolute inset-y-0 rounded transition-[width]', progressBarClass)}
          style={{ width: progress + '%' }}
        ></div>
      </div>
    </motion.div>
  )
}

export default Toast
