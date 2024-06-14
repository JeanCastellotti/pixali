<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

const progress = ref(100)
const interval = ref()

const props = defineProps<{
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}>()

const emit = defineEmits(['delete', 'progress'])

watchEffect(() => {
  if (progress.value === 0) {
    emit('delete', props.id)
  }
})

function mouseover() {
  clearInterval(interval.value)
}

onMounted(() => {
  interval.value = setInterval(() => {
    progress.value--
  }, 75)
})

onUnmounted(() => clearInterval(interval.value))

function mouseleave() {
  interval.value = setInterval(() => {
    progress.value--
  }, 75)
}

const toastClass = {
  success: 'border-emerald-200 bg-emerald-100 text-emerald-600',
  error: 'border-red-200 bg-red-100 text-red-600',
  info: 'border-sky-200 bg-sky-100 text-sky-600',
}[props.type]

const icon = {
  success: 'heroicons:check-circle',
  error: 'heroicons:exclamation-circle',
  info: 'heroicons:information-circle',
}[props.type]

const progressBarClass = {
  success: 'bg-emerald-300',
  error: 'bg-red-300',
  info: 'bg-sky-300',
}[props.type]

const progressBarBackgroundClass = {
  success: 'bg-emerald-200',
  error: 'bg-red-200',
  info: 'bg-sky-200',
}[props.type]
</script>

<template>
  <div
    @mouseover="mouseover"
    @mouseleave="mouseleave"
    class="flex max-w-96 flex-col items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm"
    :class="toastClass"
  >
    <div class="flex items-center gap-4">
      <Icon :icon="icon" class="size-6 shrink-0" />
      <span>{{ message }}</span>
      <Icon
        @click="$emit('delete', id)"
        icon="heroicons:x-circle"
        class="size-6 shrink-0 cursor-pointer opacity-50 transition hover:opacity-100"
      />
    </div>
    <div class="relative h-1.5 w-full rounded" :class="progressBarBackgroundClass">
      <div
        class="absolute inset-y-0 rounded transition-[width]"
        :class="progressBarClass"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>
