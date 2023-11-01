<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import ToastListItem from './ToastListItem.vue'

const page = usePage()

const alert = computed(() => page.props.alert)

const toasts = ref([])

function addToast() {
  toasts.value.push({
    id: Symbol(),
    type: alert.value.type,
    message: alert.value.message,
  })

  if (toasts.value.length > 3) {
    toasts.value.shift()
  }
}

function removeToast(id) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

onMounted(() => {
  if (alert.value) {
    addToast()
  }
})

const removeFinishEventListener = router.on('finish', () => {
  if (alert.value) {
    addToast()
  }
})

onUnmounted(removeFinishEventListener)
</script>

<template>
  <TransitionGroup
    tag="div"
    enter-active-class="transition ease-in duration-300"
    enter-from-class="translate-x-full opacity-0"
    leave-active-class="transition ease-in duration-300"
    leave-to-class="translate-x-full opacity-0"
    class="fixed bottom-5 right-5 z-50 flex max-w-sm flex-col items-end gap-4">
    <ToastListItem
      v-for="toast in toasts"
      :type="toast.type"
      :message="toast.message"
      :key="toast.id"
      @click="removeToast(toast.id)"
      @close="removeToast(toast.id)" />
  </TransitionGroup>
</template>
