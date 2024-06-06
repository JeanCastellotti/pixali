import { SharedProps } from '@adonisjs/inertia/types'
import { Icon } from '@iconify/react'
import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

type Toast = {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

type ToastsProps = {
  children: ReactNode
}

function Toasts({ children }: ToastsProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const { flash } = usePage<SharedProps>().props

  useEffect(() => {
    if (!flash) return

    const id = Date.now()

    if (flash.success) {
      addToast({ id, type: 'success', message: flash.success })
    }

    if (flash.error) {
      addToast({ id, type: 'error', message: flash.error })
    }

    if (flash.info) {
      addToast({ id, type: 'info', message: flash.info })
    }
  }, [flash])

  function addToast(toast: Toast) {
    if (toasts.length >= 5) {
      // setToasts((value) => [...value.slice(1)])
      removeToast(toasts[0].id)
    }

    setToasts((value) => [...value, toast])
  }

  function removeToast(id: number) {
    setToasts((value) => value.filter((item) => item.id !== id))
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 flex flex-col items-end gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} removeToast={removeToast} />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </>
  )
}

type ToastProps = { toast: Toast; removeToast(id: number): void }

function Toast({ toast, removeToast }: ToastProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => value - 1)
    }, 50)

    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  const classNames = {
    success: 'border-emerald-200 bg-emerald-100 text-emerald-600',
    error: 'border-red-200 bg-red-100 text-red-600',
    info: 'border-sky-200 bg-sky-100 text-sky-600',
  }[toast.type]

  const icon = {
    success: 'heroicons:check-circle',
    error: 'heroicons:exclamation-circle',
    info: 'heroicons:information-circle',
  }[toast.type]

  const progressBar = {
    success: 'bg-emerald-400',
    error: 'bg-red-300',
    info: 'bg-sky-300',
  }[toast.type]

  const progressBarBackground = {
    success: 'bg-emerald-200',
    error: 'bg-red-200',
    info: 'bg-sky-200',
  }[toast.type]

  return (
    <motion.div
      key={toast.id}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={clsx(
        'flex flex-col items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm',
        classNames
      )}
    >
      <div className="flex items-center gap-4">
        <Icon icon={icon} className="size-6 shrink-0" />
        <span>{toast.message}</span>
      </div>
      <div className={clsx('relative h-1.5 w-full rounded', progressBarBackground)}>
        <div
          className={clsx('absolute inset-y-0 rounded transition-[width]', progressBar)}
          style={{ width: progress + '%' }}
        ></div>
      </div>
    </motion.div>
  )
}

export default Toasts
