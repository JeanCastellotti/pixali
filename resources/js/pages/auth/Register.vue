<script setup>
import { useForm } from '@inertiajs/vue3'
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import AuthLayout from '@/layouts/AuthLayout.vue'

const form = useForm({
  username: '',
  email: '',
  password: '',
})

function submit() {
  form.post('/register', {
    onError: () => {
      form.reset('password')
      document.activeElement.blur()
    },
    replace: true,
  })
}
</script>

<template>
  <AuthLayout title="Créer un compte">
    <form @submit.prevent="submit" autocomplete="off" novalidate>
      <div class="mb-6">
        <label for="username" class="mb-3 flex items-center justify-between text-slate-300">
          <span class="font-medium">Nom d'utilisateur</span>

          <div v-if="form.errors.username" class="flex items-center gap-2 text-sm text-red-500">
            <ExclamationTriangleIcon class="h-5 w-5" />
            <span>{{ form.errors.username[0] }}</span>
          </div>
        </label>
        <input
          required
          type="text"
          id="username"
          name="username"
          v-model.trim="form.username"
          class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
      </div>

      <div class="mb-6">
        <label for="email" class="mb-3 flex items-center justify-between text-slate-300">
          <span class="font-medium">Adresse e-mail</span>
          <div v-if="form.errors.email" class="flex items-center gap-2 text-sm text-red-500">
            <ExclamationTriangleIcon class="h-5 w-5" />
            <span>{{ form.errors.email[0] }}</span>
          </div>
        </label>
        <input
          required
          type="email"
          id="email"
          name="email"
          v-model.trim="form.email"
          class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
      </div>

      <div class="mb-6">
        <label for="password" class="mb-3 flex items-center justify-between text-slate-300">
          <span class="font-medium">Mot de passe</span>
          <div v-if="form.errors.password" class="flex items-center gap-2 text-sm text-red-500">
            <ExclamationTriangleIcon class="h-5 w-5" />
            <span>{{ form.errors.password[0] }}</span>
          </div>
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          v-model.trim="form.password"
          class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
      </div>

      <button
        :disabled="form.processing"
        type="submit"
        class="disabled:hover:none mt-12 w-full rounded border border-sky-700 bg-sky-950 p-4 text-sky-300 transition hover:bg-sky-700 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-950">
        Créer un compte
      </button>
    </form>
  </AuthLayout>
</template>
