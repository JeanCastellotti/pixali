<script setup lang="ts">
import MainNavItem from './MainNavItem.vue'
</script>

<template>
  <nav class="flex items-center gap-6 text-sm text-slate-500">
    <MainNavItem href="/">Accueil</MainNavItem>
    <MainNavItem href="/threads">Discussions</MainNavItem>
    <MainNavItem href="/posts">Articles</MainNavItem>
    <MainNavItem href="/reviews">Tests</MainNavItem>
  </nav>
</template>
