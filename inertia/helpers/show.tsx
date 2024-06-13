import type { ReactNode } from 'react'

type Props = {
  when: boolean
  fallback?: ReactNode
  children: ReactNode
}

function Show({ when, fallback, children }: Props) {
  return when ? children : fallback
}

export default Show
