<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <header class="sticky top-0 z-50 mb-6 border-b bg-white/90 backdrop-blur-lg">
    <div class="container flex h-16 items-center justify-between gap-12">
      <Link href="/" class="relative -top-0.5">
        <img src="../../public/logo.png" alt="Logo Pixali" />
      </Link>
      <slot />
    </div>
  </header>
</template>
