import clsx from 'clsx'

type Props = {
  username: string
  className?: string
}

function Avatar({ username, className }: Props) {
  const initials = username.substring(0, 2)

  return (
    <div
      className={clsx('flex rounded-full bg-amber-500 font-medium uppercase text-white', className)}
    >
      <span className="m-auto">{initials}</span>
    </div>
  )
}

export default Avatar
