<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Head, useForm } from '@inertiajs/vue3'

const props = defineProps<{ token: string }>()

const form = useForm({
  password: null,
  passwordConfirmation: null,
})

function submit() {
  if (form.processing) return
  form
    .transform((data) => ({
      ...data,
      token: props.token,
    }))
    .post('/reset-password', {
      onFinish() {
        form.reset()
      },
    })
}
</script>

<template>
  <Head title="Modifier mot de passe" />

  <h1 class="mb-6 text-4xl font-medium text-slate-700">Modifier mot de passe</h1>

  <form @submit.prevent="submit" class="flex w-full flex-col space-y-6" autocomplete="off">
    <div class="flex flex-col">
      <label class="text-slate-700">Mot de passe</label>
      <input
        required
        type="password"
        v-model="form.password"
        class="rounded border p-4 text-slate-500 transition focus:outline-none"
        :class="
          form.errors.password
            ? 'border-red-300 bg-red-50 focus:border-red-300'
            : 'border-slate-300 bg-slate-100 focus:border-amber-300 focus:bg-amber-50'
        "
      />
      <span v-if="form.errors.password" class="mt-1 flex items-center gap-2 text-sm text-red-500">
        {{ form.errors.password[0] }}
      </span>
    </div>

    <div class="flex flex-col">
      <label class="text-slate-700">Confirmation mot de passe</label>
      <input
        required
        type="password"
        v-model="form.passwordConfirmation"
        class="rounded border p-4 text-slate-500 transition focus:outline-none"
        :class="
          form.errors.passwordConfirmation
            ? 'border-red-300 bg-red-50 focus:border-red-300'
            : 'border-slate-300 bg-slate-100 focus:border-amber-300 focus:bg-amber-50'
        "
      />
    </div>

    <button
      type="submit"
      :disabled="form.processing"
      class="flex justify-center rounded bg-slate-700 p-4 text-lg/6 text-white transition hover:opacity-90 disabled:cursor-not-allowed"
    >
      <div v-if="form.processing" class="size-6">
        <Icon icon="gg:spinner-two" class="size-6 animate-spin" />
      </div>
      <span v-else>Modifier mot de passe</span>
    </button>
  </form>
</template>
