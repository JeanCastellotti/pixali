<script setup>
defineProps(['title'])
</script>

<template>
  <div class="mx-auto w-full max-w-screen-sm">
    <Head :title="title" />
    <h1 class="mb-20 text-center text-5xl font-bold tracking-wide text-slate-300">{{ title }}</h1>
    <slot />
  </div>
</template>
