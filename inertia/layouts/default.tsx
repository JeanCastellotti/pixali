import type { ReactNode } from 'react'
import Header from '~/components/header'

type Props = {
  children: ReactNode
}

function Default({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <Header />
      <main className="container">{children}</main>
    </div>
  )
}

export default Default
