<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import TheBanner from '@/components/TheBanner.vue'
import TheHeader from '@/components/TheHeader.vue'
import ToastList from '@/components/ToastList.vue'

const props = defineProps(['action'])

const page = usePage()

const user = computed(() => page.props.user)
</script>

<template>
  <div class="min-h-screen bg-slate-900 pb-10">
    <TheBanner v-if="user && !user.verified" />
    <TheHeader />
    <ToastList />

    <main class="container">
      <slot />
    </main>
  </div>
</template>
