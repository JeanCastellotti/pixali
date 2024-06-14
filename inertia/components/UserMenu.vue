<script setup lang="ts">
import type { SharedProps } from '@adonisjs/inertia/types'
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import UserAvatar from './UserAvatar.vue'
import { Icon } from '@iconify/vue'

const page = usePage<SharedProps>()

const authenticated = computed(() => page.props.authenticated)
</script>

<template>
  <Menu v-if="authenticated" as="div" class="relative">
    <MenuButton
      class="relative flex items-center gap-2 rounded-md px-2 py-1.5 data-[hover]:bg-slate-100 data-[open]:bg-slate-200"
    >
      <div class="relative">
        <img
          v-if="authenticated.avatar"
          :src="authenticated.avatar"
          class="mr-2 size-8 rounded-full object-cover"
        />

        <UserAvatar v-else :username="authenticated.username" class="mr-2 size-8 text-sm" />

        <div class="absolute -top-0.5 right-1 flex size-3">
          <div class="absolute size-full rounded-full bg-amber-500 opacity-75"></div>
          <div class="relative size-3 rounded-full border-2 border-white bg-red-500"></div>
        </div>
      </div>
      <span class="text-sm text-slate-800">{{ authenticated.username }}</span>
      <Icon icon="heroicons:chevron-down-16-solid" class="size-4 text-slate-800" />
    </MenuButton>
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-50 mt-1 flex w-52 origin-top-right flex-col rounded-md border border-slate-200 bg-white p-1 text-sm/6 shadow"
      >
        <MenuItem>
          <Link
            href="/profile"
            class="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
          >
            <Icon icon="heroicons:user-16-solid" class="size-4 text-slate-800" />
            <span>Profil</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href=""
            class="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
          >
            <Icon icon="heroicons:document-text-16-solid" class="size-4 text-slate-800" />
            <span>Articles</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href=""
            class="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
          >
            <Icon icon="heroicons:star-16-solid" class="size-4 text-slate-800" />
            <span>Tests</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href=""
            class="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
          >
            <Icon icon="heroicons:chat-bubble-left-right-16-solid" class="size-4 text-slate-800" />
            <span>Discussions</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href=""
            class="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
          >
            <Icon icon="heroicons:inbox-16-solid" class="size-4 text-slate-800" />
            <div class="flex items-center gap-2">
              <span>Messages</span>
              <div
                class="flex aspect-square size-5 items-center justify-center rounded-full bg-amber-500 text-xs text-amber-50"
              >
                20
              </div>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/logout"
            as="button"
            method="post"
            class="flex items-center gap-4 rounded-md px-3 py-1.5 text-red-500 transition hover:bg-red-50"
          >
            <Icon
              icon="heroicons:arrow-right-start-on-rectangle-16-solid"
              class="size-4 text-red-500"
            />
            <span>Se déconnecter</span>
          </Link>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>

  <div v-else class="flex gap-2">
    <Link
      href="/login"
      class="rounded bg-slate-200 px-2.5 py-1.5 text-sm text-slate-700 transition hover:opacity-90"
    >
      Se connecter
    </Link>
    <Link
      href="/register"
      class="rounded bg-slate-700 px-2.5 py-1.5 text-sm text-white transition hover:opacity-90"
    >
      Créer un compte
    </Link>
  </div>
</template>
