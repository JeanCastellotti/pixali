<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 p-10">
    <div class="m-auto flex w-full max-w-screen-sm flex-col items-center">
      <Link href="/" class="mb-7">
        <img src="../../public/logo-large.png" alt="Logo Pixali" />
      </Link>
      <main
        class="flex w-full flex-col items-center gap-7 rounded-lg border border-slate-200 bg-white p-10"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
