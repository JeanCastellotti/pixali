<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import TheBanner from '@/components/TheBanner.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheAlert from '@/components/TheAlert.vue'

const props = defineProps(['action'])

const page = usePage()

const user = computed(() => page.props.user)
</script>

<template>
  <div class="min-h-screen bg-slate-900 pb-10">
    <TheBanner v-if="user && !user.verified" />
    <TheHeader />

    <main class="container">
      <TheAlert
        v-if="$page.props.alert"
        @close="$page.props.alert = null"
        v-bind="$page.props.alert"
        class="mb-16" />
      <slot />
    </main>
  </div>
</template>
