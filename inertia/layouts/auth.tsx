import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Auth({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50 p-20">
      <div className="m-auto flex w-full max-w-screen-sm flex-col items-center">
        <Link href="/" className="mb-10">
          <img src="/logo-large.png" alt="Logo Pixali" />
        </Link>

        {children}
      </div>
    </div>
  )
}

export default Auth
