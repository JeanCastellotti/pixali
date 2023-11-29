<script setup>
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid'
import { router, usePage } from '@inertiajs/vue3'

const page = usePage()

const alert = ref(null)

watchEffect(() => {
  if (page.props.alert) {
    alert.value = page.props.alert
  }
})

function close() {
  alert.value = null
}

onUnmounted(
  router.on('navigate', () => {
    alert.value = null
  })
)

const color = computed(() => {
  switch (alert.value.type) {
    case 'success':
      return 'text-emerald-100 bg-emerald-500'
    case 'error':
      return 'text-red-100 bg-red-500'
    case 'info':
      return 'text-sky-100 bg-sky-500'
  }
})

const icon = computed(() => {
  switch (alert.value.type) {
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
  <div v-if="alert" class="flex items-center justify-between gap-4 rounded p-4" :class="color">
    <div class="flex items-center gap-4">
      <span class="shrink-0">
        <component :is="icon" class="h-6 w-6" />
      </span>
      <span>
        {{ alert.message }}
      </span>
    </div>
    <XCircleIcon
      @click="close"
      class="h-6 w-6 shrink-0 cursor-pointer opacity-50 transition hover:opacity-100" />
  </div>
</template>
