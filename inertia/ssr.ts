import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import ToastsLayout from './layouts/ToastsLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
      // eslint-disable-next-line
      const page = pages[`./pages/${name}.vue`]
      page.default.layout ??= [ToastsLayout, name.startsWith('auth/') ? AuthLayout : DefaultLayout]
      return page
    },
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
