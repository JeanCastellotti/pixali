import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Header({ children }: Props) {
  return (
    <header className="sticky top-0 z-50 mb-6 border-b bg-white/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-12">
        <Link href="/" className="relative -top-0.5">
          <img src="/logo.png" alt="Logo Pixali" />
        </Link>
        {children}
      </div>
    </header>
  )
}

export default Header
