import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import Auth from './layouts/auth'
import type { ReactNode } from 'react'
import Default from './layouts/default'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
    resolve: (name) => {
      const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
      // eslint-disable-next-line
      const page = pages[`./pages/${name}.tsx`]
      // @ts-expect-error
      page.default.layout = name.startsWith('auth/')
        ? (p: ReactNode) => <Auth children={p} />
        : (p: ReactNode) => <Default children={p} />

      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
