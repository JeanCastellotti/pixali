<script setup>
import TheAlert from '@/components/TheAlert.vue'
import { HomeIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="grid h-screen grid-cols-2">
    <img src="/wallpaper.jpg" alt="" class="self-stretch object-cover" />
    <div class="flex bg-slate-900 p-20">
      <div class="m-auto w-full max-w-screen-sm">
        <div class="mb-10 flex items-center justify-between">
          <Link href="/">
            <img src="/logo-large.png" alt="" />
          </Link>
          <Link
            href="/"
            class="flex items-center gap-4 rounded-full bg-sky-950 p-3 text-sky-300 ring-sky-700 ring-offset-2 ring-offset-slate-900 transition hover:bg-sky-700 hover:text-sky-200 hover:ring-2">
            <HomeIcon class="h-6 w-6" />
          </Link>
        </div>
    <slot />
      </div>
    </div>
  </div>
</template>
