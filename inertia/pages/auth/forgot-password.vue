<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Head, useForm } from '@inertiajs/vue3'

const form = useForm({
  email: null,
})

function submit() {
  if (form.processing) return

  form.post('/forgot-password', {
    onSuccess: () => {
      form.reset()
    },
  })
}
</script>

<template>
  <Head title="Mot de passe oublié" />

  <h1 class="mb-6 text-4xl font-medium text-slate-700">Mot de passe oublié</h1>

  <form @submit.prevent="submit" class="flex w-full flex-col space-y-6" autocomplete="off">
    <div class="flex flex-col">
      <label class="text-slate-700">Adresse e-mail</label>
      <input
        required
        type="email"
        v-model="form.email"
        class="rounded border p-4 text-slate-500 transition focus:outline-none"
        :class="
          form.errors.email
            ? 'border-red-300 bg-red-50 focus:border-red-300'
            : 'border-slate-300 bg-slate-100 focus:border-amber-300 focus:bg-amber-50'
        "
      />

      <span v-if="form.errors.email" class="mt-1 flex items-center gap-2 text-sm text-red-500">
        {{ form.errors.email[0] }}
      </span>
    </div>

    <button
      type="submit"
      :disabled="form.processing"
      class="flex justify-center rounded bg-slate-700 p-4 text-lg/6 text-white transition hover:opacity-90 disabled:cursor-not-allowed"
    >
      <div v-if="form.processing" class="size-6">
        <Icon icon="gg:spinner-two" class="size-6 animate-spin" />
      </div>
      <span v-else>Réinitialiser mot de passe</span>
    </button>
  </form>
</template>
