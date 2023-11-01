<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/solid'

const emit = defineEmits(['close'])

const props = defineProps({
  type: String,
  message: String,
  timeout: {
    type: Number,
    default: 5000,
  },
})

const color = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-emerald-500'
    case 'error':
      return 'text-red-500'
    case 'info':
      return 'text-sky-500'
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return ExclamationCircleIcon
    case 'info':
      return InformationCircleIcon
  }
})

const timer = ref(null)

onMounted(() => {
  timer.value = setTimeout(() => emit('close'), props.timeout)
})

onUnmounted(() => clearTimeout(timer.value))
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-4 rounded border-2 border-slate-700 bg-slate-950 p-4 shadow"
    :class="color">
    <span class="shrink-0">
      <component :is="icon" class="h-8 w-8" />
    </span>
    <span>
      {{ message }}
    </span>
  </div>
</template>
