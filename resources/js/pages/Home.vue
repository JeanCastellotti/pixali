<script setup>
import { ChatBubbleBottomCenterTextIcon, ClockIcon } from '@heroicons/vue/24/solid'

import { PlusCircleIcon } from '@heroicons/vue/20/solid'
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Accueil" />

  <div class="grid grid-cols-12 gap-10">
    <div class="col-span-5 flex flex-col items-end space-y-6">
      <article v-for="n in 10" class="group flex cursor-pointer items-start gap-4 transition">
        <img src="https://picsum.photos/50" alt="Avatar" class="h-12 w-12 rounded object-cover" />
        <div
          class="space-y-2 rounded bg-slate-800 p-4 text-sm font-medium ring-slate-800 ring-offset-4 ring-offset-slate-900 transition group-hover:ring-4">
          <span class="block text-slate-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, soluta?
          </span>
          <footer class="flex items-center gap-4">
            <span class="text-sky-500">UserName</span>
            <div class="flex items-center gap-2 text-slate-400">
              <ClockIcon class="h-6 w-6" />
              <span>5 min</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400">
              <ChatBubbleBottomCenterTextIcon class="h-6 w-6" />
              <span>38</span>
            </div>
          </footer>
        </div>
      </article>

      <Link
        href="/threads/create"
        class="flex items-center gap-2 rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-slate-200">
        <PlusCircleIcon class="h-5 w-5" />
        <span>Démarrer une discussion</span>
      </Link>
    </div>
    <div class="col-span-7 flex flex-col items-end space-y-6">
      <article v-for="n in 5" class="group flex cursor-pointer gap-4">
        <div class="w-[232px] shrink-0 overflow-hidden rounded">
          <img
            src="https://picsum.photos/200"
            alt="Thumbnail"
            class="h-full w-full object-cover transition group-hover:scale-110" />
        </div>

        <div class="space-y-4 font-medium">
          <h2 class="text-xl text-slate-200">Lorem ipsum dolor sit amet consectetur</h2>
          <p class="text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus illum ratione
            aperiam...
          </p>
          <footer class="flex items-center gap-4 text-sm">
            <span class="text-sky-500">UserName</span>
            <div class="flex items-center gap-2 text-slate-400">
              <ClockIcon class="h-6 w-6" />
              <span>5 min</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400">
              <ChatBubbleBottomCenterTextIcon class="h-6 w-6" />
              <span>38</span>
            </div>
          </footer>
        </div>
      </article>

      <Link
        href="/posts/create"
        class="flex items-center gap-2 rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-slate-200">
        <PlusCircleIcon class="h-5 w-5" />
        <span>Créer un article</span>
      </Link>
    </div>
  </div>
</template>
