<script setup>
import { useForm } from '@inertiajs/vue3'
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import AuthLayout from '@/layouts/AuthLayout.vue'

const props = defineProps(['email', 'token'])

const form = useForm({
  password: '',
  password_confirmation: '',
})

function submit() {
  form
    .transform((data) => ({
      ...data,
      email: props.email,
      token: props.token,
    }))
    .post('/reset-password', {
      onError: () => {
        form.reset('password', 'password_confirmation')
        document.activeElement.blur()
      },
      replace: true,
    })
}
</script>

<template>
  <Head title="Modifier mon mot de passe" />

  <form @submit.prevent="submit" autocomplete="off" novalidate>
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
        readonly
        type="email"
        id="email"
        name="email"
        :value="email"
        class="w-full cursor-not-allowed rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:outline-none" />
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
        v-model="form.password"
        class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
    </div>

    <div class="mb-6">
      <label
        for="password_confirmation"
        class="mb-1 flex items-center justify-between text-slate-300">
        <span class="font-medium">Confirmation mot de passe</span>
        <div
          v-if="form.errors.password_confirmation"
          class="flex items-center gap-2 text-sm text-red-500">
          <ExclamationTriangleIcon class="h-6 w-6" />
          <span>{{ form.errors.password_confirmation[0] }}</span>
        </div>
      </label>
      <input
        required
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        v-model="form.password_confirmation"
        class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
    </div>

    <button
      :disabled="form.processing"
      type="submit"
      class="disabled:hover:none mt-12 w-full rounded border border-sky-700 bg-sky-950 p-4 text-sky-300 transition hover:bg-sky-700 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-950">
      Modifier mon mot de passe
    </button>
  </form>
</template>
