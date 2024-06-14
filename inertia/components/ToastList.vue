<script setup lang="ts">
import { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/vue3'
import { computed, ref, watch } from 'vue'
import ToastItem from './ToastItem.vue'

type Toast = {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

const toasts = ref<Toast[]>([])

const page = usePage<SharedProps>()

const flash = computed(() => page.props.flash)

watch(
  flash,
  () => {
    const id = Date.now()

    if (flash.value.success) {
      addToast({ id, type: 'success', message: flash.value.success })
    }

    if (flash.value.error) {
      addToast({ id, type: 'error', message: flash.value.error })
    }

    if (flash.value.info) {
      addToast({ id, type: 'info', message: flash.value.info })
    }
  },
  { immediate: true }
)

function addToast(toast: Toast) {
  if (toasts.value.length >= 5) {
    toasts.value.shift()
  }
  toasts.value.push(toast)
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}
</script>

<template>
  <TransitionGroup
    tag="div"
    enter-active-class="transition"
    enter-from-class="opacity-0 translate-x-8"
    leave-to-class="opacity-0 translate-x-8"
    leave-active-class="transition"
    class="fixed bottom-5 right-5 flex transform flex-col items-end gap-2"
  >
    <ToastItem v-for="toast in toasts" :key="toast.id" v-bind="toast" @delete="removeToast" />
  </TransitionGroup>
</template>
