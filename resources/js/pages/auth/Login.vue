<script setup>
import { Head, useForm } from '@inertiajs/vue3'

const form = useForm({
  email: '',
  password: '',
})

function submit() {
  form.post('/login', {
    onSuccess: () => {
      form.reset('password')
      document.activeElement.blur()
    },
    // replace: true,
  })
}
</script>

<template>
  <Head title="Connexion" />

  <form @submit.prevent="submit" autocomplete="off" novalidate>
    <div class="mb-6">
      <label for="email" class="mb-3 block font-medium text-slate-300">Adresse e-mail</label>
      <input
        required
        type="email"
        id="email"
        name="email"
        v-model.trim="form.email"
        class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
    </div>

    <div class="mb-6">
      <label for="password" class="mb-3 block font-medium text-slate-300">Mot de passe</label>
      <input
        required
        type="password"
        id="password"
        name="password"
        v-model="form.password"
        class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
    </div>

    <button
      :disabled="form.processing"
      type="submit"
      class="mt-12 w-full rounded border border-sky-700 bg-sky-950 p-4 text-sky-300 transition hover:bg-sky-700 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-950">
      Se connecter
    </button>

    <div class="mt-12 flex justify-between">
      <Link
        href="/register"
        class="text-sm font-medium text-sky-500 transition hover:text-slate-300">
        Je n'ai pas de compte
      </Link>
      <Link
        href="/forgot-password"
        class="text-sm font-medium text-sky-500 transition hover:text-slate-300">
        J'ai oublié mon mot de passe
      </Link>
    </div>
  </form>
</template>
