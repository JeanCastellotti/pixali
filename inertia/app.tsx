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

createInertiaApp({
  progress: { color: '#F7971E' },
  title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    )
    // @ts-expect-error
    page.default.layout = name.startsWith('auth/')
      ? (p: ReactNode) => <Auth children={p} />
      : (p: ReactNode) => <Default children={p} />

    return page
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
