import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Auth({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50 p-10">
      <div className="m-auto flex w-full max-w-screen-sm flex-col items-center">
        <Link href="/" className="mb-7">
          <img src="/logo-large.png" alt="Logo Pixali" />
        </Link>
        <main className="flex w-full flex-col items-center gap-7 rounded-lg border border-slate-200 bg-white p-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Auth
