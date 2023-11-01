<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
const user = computed(() => page.props.user)
</script>

<template>
  <header class="mb-12">
    <div class="container flex items-center justify-between gap-12 py-6">
      <Link href="/" class="relative -top-0.5">
        <img src="/logo.png" alt="Logo Pixali" />
      </Link>

      <nav class="flex items-center gap-6 text-sm font-medium text-slate-400">
        <Link href="/" class="hover:text-sky-500" :class="{ 'text-slate-300 ': $page.url === '/' }">
          Accueil
        </Link>
        <Link
          href="/threads"
          class="hover:text-sky-500"
          :class="{ 'text-slate-300 ': $page.url === '/threads' }">
          Discussions
        </Link>
        <Link
          href="/posts"
          class="hover:text-sky-500"
          :class="{ 'text-slate-300 ': $page.url === '/posts' }">
          Articles
        </Link>
        <Link
          href="/reviews"
          class="hover:text-sky-500"
          :class="{ 'text-slate-300 ': $page.url === '/reviews' }">
          Tests
        </Link>
      </nav>

      <div class="flex gap-3 text-sm font-medium">
        <template v-if="user">
          <Link
            as="button"
            method="post"
            href="/logout"
            class="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-200">
            Déconnexion
          </Link>
          <Link
            href="/account"
            class="rounded border border-sky-700 bg-sky-950 px-3 py-2 text-sky-300 transition hover:bg-sky-700 hover:text-sky-200">
            Mon compte
          </Link>
        </template>
        <template v-else>
          <Link
            href="/login"
            class="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-200">
            Connexion
          </Link>
          <Link
            href="/register"
            class="rounded border border-sky-700 bg-sky-950 px-3 py-2 text-sky-300 transition hover:bg-sky-700 hover:text-sky-200">
            Créer un compte
          </Link>
        </template>
      </div>
    </div>
  </header>
</template>
