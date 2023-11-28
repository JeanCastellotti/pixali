<script setup>
import { computed } from 'vue'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid'

const props = defineProps(['type', 'message'])

defineEmits(['close'])

const color = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-emerald-100 bg-emerald-500'
    case 'error':
      return 'text-red-100 bg-red-500'
    case 'info':
      return 'text-sky-100 bg-sky-500'
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
</script>

<template>
  <div class="flex items-center justify-between rounded p-4" :class="color">
    <div class="flex items-center gap-4">
      <span class="shrink-0">
        <component :is="icon" class="h-6 w-6" />
      </span>
      <span>
        {{ message }}
      </span>
    </div>
    <XCircleIcon
      @click="$emit('close')"
      class="h-6 w-6 cursor-pointer opacity-50 transition hover:opacity-100" />
  </div>
</template>
