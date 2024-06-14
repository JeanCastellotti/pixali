<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

const form = useForm({
  email: null,
  password: null,
  remember: true,
})

function submit() {
  if (form.processing) return

  form.post('/login', {
    onFinish: () => {
      form.reset('password')
    },
  })
}

function test() {
  form.reset()
}
</script>

<template>
  <Head title="Se connecter" />

  <div class="flex flex-col items-center">
    <button @click="test">reset</button>
    <h1 class="text-4xl font-medium text-slate-700">Se connecter</h1>
    <span class="text-slate-500">
      ou
      <Link href="/register" class="text-amber-500 hover:underline"> créer un compte </Link>
    </span>
  </div>

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
    </div>

    <div class="flex flex-col">
      <div class="flex items-center justify-between">
        <label class="text-slate-700">Mot de passe</label>
        <Link href="/forgot-password" class="text-sm text-slate-500 hover:text-amber-500">
          Mot de passe oublié ?
        </Link>
      </div>
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
    </div>

    <div class="flex items-center gap-2">
      <input type="checkbox" v-model="form.remember" />
      <label class="text-sm text-slate-500">Se souvenir de moi</label>
    </div>

    <button
      type="submit"
      :disabled="form.processing"
      class="flex justify-center rounded bg-slate-700 p-4 text-lg/6 text-white transition hover:opacity-90 disabled:cursor-not-allowed"
    >
      <div v-if="form.processing" class="size-6">
        <Icon icon="gg:spinner-two" class="size-6 animate-spin" />
      </div>
      <span v-else>Se connecter</span>
    </button>

    <div class="flex items-center gap-5">
      <div class="w-full border-b border-slate-200"></div>
      <span class="font-semibold text-slate-500">ou</span>
      <div class="w-full border-b border-slate-200"></div>
    </div>

    <a
      href="/discord/redirect"
      class="flex items-center justify-center gap-4 rounded bg-[#7289da] p-2.5 text-white transition hover:opacity-90"
    >
      <div class="rounded-full bg-white p-2 transition hover:scale-105">
        <Icon icon="simple-icons:discord" class="size-6 text-[#7289da]" />
      </div>
      <span>Se connecter avec Discord</span>
    </a>
  </form>
</template>
