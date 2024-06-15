import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import Auth from './layouts/auth'
import type { ReactNode } from 'react'
import Default from './layouts/default'
import Toast from './components/toast'

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
      // eslint-disable-next-line
      page.default.layout = (page: ReactNode) => {
        return (
          <>
            <Toast />
            {name.startsWith('auth/') ? <Auth children={page} /> : <Default children={page} />}
          </>
        )
      }

      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
