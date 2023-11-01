<script setup>
import { ShieldExclamationIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="border-b border-slate-800 bg-slate-950 py-3">
    <div class="container flex items-center justify-center gap-6 text-sm text-slate-300">
      <ShieldExclamationIcon class="h-6 w-6" />
      <span>Vous adresse e-mail n'a pas été vérifiée.</span>
      <Link
        href="/verify"
        as="button"
        method="post"
        class="rounded bg-slate-800 px-2.5 py-1.5 text-slate-300 transition hover:bg-slate-700 hover:text-slate-300">
        Envoyer un nouveau lien
      </Link>
    </div>
  </div>
</template>
