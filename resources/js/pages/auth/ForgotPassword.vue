<script setup>
import { useForm } from '@inertiajs/vue3'
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import AuthLayout from '@/layouts/AuthLayout.vue'

const form = useForm({
  email: '',
})

function submit() {
  form.post('/forgot-password', {
    onSuccess: () => {
      form.reset('email')
      document.activeElement.blur()
    },
    replace: true,
  })
}
</script>

<template>
  <AuthLayout title="Mot de passe oublié">
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
          type="email"
          id="email"
          name="email"
          v-model="form.email"
          class="w-full rounded border border-slate-600 bg-slate-950 p-4 text-slate-500 opacity-60 shadow-lg transition focus:opacity-100 focus:outline-none" />
      </div>

      <button
        :disabled="form.processing"
        type="submit"
        class="disabled:hover:none mt-12 w-full rounded border border-sky-700 bg-sky-950 p-4 text-sky-300 transition hover:bg-sky-700 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-950">
        Réinitialiser mon mot de passe
      </button>
    </form>
  </AuthLayout>
</template>
