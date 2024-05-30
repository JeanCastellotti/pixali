import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

type InertiaAlert = {
  type: 'success' | 'error' | 'info'
  message: string
}

function Alert() {
  const alert = usePage().props.alert as InertiaAlert

  const [show, setShow] = useState(!!alert)

  useEffect(() => {
    if (alert) {
      setShow(true)
    }
  }, [alert])

  if (!alert) return

  const classNames = {
    success: 'text-emerald-600 bg-emerald-100 border-emerald-200',
    error: 'text-red-600 bg-red-100 border-red-200',
    info: 'text-sky-600 bg-sky-100 border-sky-200',
  }[alert.type]

  const icon = {
    success: <Icon icon="heroicons:check-circle" className="size-6 fill-current" />,
    error: <Icon icon="heroicons:exclamation-circle" className="size-6 fill-current" />,
    info: <Icon icon="heroicons:information-circle" className="size-6 fill-current" />,
  }[alert.type]

  function close() {
    setShow(false)
  }

  return (
    show && (
      <div
        className={clsx(
          'mx-auto mb-6 flex w-full max-w-screen-sm items-center justify-between gap-4 rounded-lg border p-4',
          classNames
        )}
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0" children={icon} />
          <span>{alert.message}</span>
        </div>
        <Icon
          icon="heroicons:x-circle"
          onClick={close}
          className="size-6 shrink-0 cursor-pointer fill-current opacity-50 transition hover:opacity-100"
        />
      </div>
    )
  )
}

export default Alert
