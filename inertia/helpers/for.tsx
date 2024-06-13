import type { ReactNode } from 'react'

type Props<T> = {
  each: T[]
  fallback?: ReactNode
  children: (item: T, index: number) => ReactNode
}

function For<T>({ each, fallback, children }: Props<T>) {
  return each.length > 0 ? each.map(children) : fallback
}

export default For
