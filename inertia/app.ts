/// <reference path="../adonisrc.ts" />
/// <reference path="../config/auth.ts" />
/// <reference path="../config/inertia.ts" />

import './tailwind.css'
import { createSSRApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import ToastsLayout from './layouts/ToastsLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

createInertiaApp({
  progress: { color: '#F7971E' },
  title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./pages/**/*.vue')
    )
    // eslint-disable-next-line
    page.default.layout ??= [ToastsLayout, name.startsWith('auth/') ? AuthLayout : DefaultLayout]
    return page
  },
  setup({ el, App, props, plugin }) {
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
