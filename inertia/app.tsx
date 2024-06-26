/// <reference path="../adonisrc.ts" />
/// <reference path="../config/auth.ts" />
/// <reference path="../config/inertia.ts" />

import './tailwind.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Default from './layouts/default'
import type { ReactNode } from 'react'
import Auth from './layouts/auth'
import Toast from './components/toast'
import Account from './layouts/account'

createInertiaApp({
  progress: { color: '#F7971E' },
  title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    )
    // @ts-expect-error
    // eslint-disable-next-line
    page.default.layout ??= (page: ReactNode) => {
      return (
        <>
          <Toast />
          {name.startsWith('auth/') ? (
            <Auth children={page} />
          ) : (
            <Default>{name.startsWith('account/') ? <Account children={page} /> : page}</Default>
          )}
        </>
      )
    }

    return page
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
