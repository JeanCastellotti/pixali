import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

type InertiaNotification = {
  type: 'success' | 'error' | 'info'
  message: string
}

function Notification() {
  const notification = usePage().props.notification as InertiaNotification

  const [show, setShow] = useState(!!notification)

  useEffect(() => {
    if (notification) {
      setShow(true)
    }
  }, [notification])

  if (!notification) return

  const classNames = {
    success: 'text-emerald-600 bg-emerald-100 border-emerald-200',
    error: 'text-red-600 bg-red-100 border-red-200',
    info: 'text-sky-600 bg-sky-100 border-sky-200',
  }[notification.type]

  const icon = {
    success: <CheckCircleIcon className="size-6" />,
    error: <ExclamationCircleIcon className="size-6" />,
    info: <InformationCircleIcon className="size-6" />,
  }[notification.type]

  function close() {
    setShow(false)
  }

  return (
    show && (
      <div
        className={clsx(
          'mx-auto mb-6 flex max-w-screen-sm items-center justify-between gap-4 rounded-lg border p-4',
          classNames
        )}
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0" children={icon} />
          <span>{notification.message}</span>
        </div>
        <XCircleIcon
          onClick={close}
          className="size-6 shrink-0 cursor-pointer opacity-50 transition hover:opacity-100"
        />
      </div>
    )
  )
}

export default Notification
