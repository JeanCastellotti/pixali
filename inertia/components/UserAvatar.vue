<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ username: string }>()

const initials = computed(() => props.username.substring(0, 2))
</script>

<template>
  <div class="flex rounded-full bg-amber-500 font-medium uppercase text-white">
    <span class="m-auto">{{ initials }}</span>
  </div>
</template>
