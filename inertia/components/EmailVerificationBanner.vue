<script setup lang="ts">
import type { SharedProps } from '@adonisjs/inertia/types'
import { Icon } from '@iconify/vue'
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage<SharedProps>()

const authenticated = computed(() => page.props.authenticated)
</script>

<template>
  <div v-if="authenticated" class="bg-slate-800 py-3">
    <div class="container flex items-center justify-center gap-10">
      <div class="flex items-center gap-2">
        <Icon icon="heroicons:shield-exclamation" class="size-6 text-slate-100" />
        <span class="mt-0.5 text-sm text-slate-100">
          Votre adresse e-mail n'a pas été vérifiée.
        </span>
      </div>
      <Link
        href="/verify"
        as="button"
        method="post"
        class="rounded bg-slate-100 px-2.5 py-1.5 text-xs text-slate-800 transition hover:opacity-80"
      >
        Envoyer un nouveau lien
      </Link>
    </div>
  </div>
</template>
