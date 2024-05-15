import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Auth({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50 p-20">
      <main className="m-auto flex w-full max-w-screen-sm flex-col items-center gap-7 rounded-lg border bg-white p-10">
        <Link href="/">
          <img src="/logo-large.png" alt="Logo Pixali" />
        </Link>
        {children}
      </main>
    </div>
  )
}

export default Auth
