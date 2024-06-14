<script setup lang="ts">
import EmailVerificationBanner from '~/components/EmailVerificationBanner.vue'
import MainNav from '~/components/MainNav.vue'
import TheHeader from '~/components/TheHeader.vue'
import UserMenu from '~/components/UserMenu.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-10">
    <EmailVerificationBanner />
    <TheHeader>
      <MainNav />
      <UserMenu />
    </TheHeader>
    <main class="container">
      <slot />
    </main>
  </div>
</template>
