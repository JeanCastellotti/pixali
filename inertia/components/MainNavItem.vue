<script setup lang="ts">
import { SharedProps } from '@adonisjs/inertia/types'
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

defineProps<{ href: string }>()

const page = usePage<SharedProps>()

const url = computed(() => page.url)
</script>

<template>
  <Link :href class="hover:text-amber-500" :class="{ 'text-slate-700': url === href }">
    <slot />
  </Link>
</template>
