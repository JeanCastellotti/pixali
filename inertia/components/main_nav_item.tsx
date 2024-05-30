import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
}

function MainNavItem({ href, children }: Props) {
  const { url } = usePage()

  return (
    <Link href={href} className={clsx('hover:text-amber-500', url === href && 'text-slate-700')}>
      {children}
    </Link>
  )
}

export default MainNavItem
