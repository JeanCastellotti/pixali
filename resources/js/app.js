import '../css/tailwind.css'

import { createApp, h } from 'vue'
import { Head, Link, createInertiaApp } from '@inertiajs/vue3'

createInertiaApp({
  title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .component('Head', Head)
      .component('Link', Link)
      .mount(el)
  },
})
