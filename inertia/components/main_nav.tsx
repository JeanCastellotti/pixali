import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import type { ReactNode } from 'react'

function MainNav() {
  return (
    <nav className="flex items-center gap-6 text-sm text-slate-500">
      <MainNavItem href="/">Accueil</MainNavItem>
      <MainNavItem href="/threads">Discussions</MainNavItem>
      <MainNavItem href="/posts">Articles</MainNavItem>
      <MainNavItem href="/reviews">Tests</MainNavItem>
    </nav>
  )
}

type MainNavItemProps = {
  href: string
  children: ReactNode
}

function MainNavItem({ href, children }: MainNavItemProps) {
  const { url } = usePage()

  return (
    <Link href={href} className={clsx('hover:text-amber-500', url === href && 'text-slate-700')}>
      {children}
    </Link>
  )
}

export default MainNav
