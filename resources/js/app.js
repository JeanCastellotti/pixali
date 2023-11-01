import '../css/tailwind.css'

import { createApp, h } from 'vue'
import { Head, Link, createInertiaApp } from '@inertiajs/vue3'
import DefaultLayout from './layouts/DefaultLayout.vue'

createInertiaApp({
  title: (title) => (title ? `${title} - Pixali` : 'Pixali'),
  resolve: (name) => {
    const page = require(`./pages/${name}`).default
    page.layout ??= DefaultLayout
    return page
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .component('Head', Head)
      .component('Link', Link)
      .mount(el)
  },
})
