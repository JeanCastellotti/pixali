<script setup lang="ts">
import ProfileController from '#controllers/profile_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Icon } from '@iconify/vue'
import { Head, Link } from '@inertiajs/vue3'
import UserAvatar from '~/components/UserAvatar.vue'

defineProps<{ user: InferPageProps<ProfileController, 'handle'>['user'] }>()

function updateDetails() {}
function updateUsername() {}
function updateEmail() {}
function updatePassword() {}
function deleteAccount() {}
</script>

<template>
  <Head title="Profil"></Head>

  <div class="flex flex-col gap-10">
    <h1 class="text-4xl font-bold tracking-wide text-slate-800">Profil</h1>

    <form
      @submit.prevent="updateDetails"
      class="grid grid-cols-2 items-center gap-5 border-b pb-10"
    >
      <h2 class="col-span-2 text-2xl font-medium text-slate-500">Information générales</h2>

      <img
        v-if="user.avatar"
        :src="user.avatar"
        alt=""
        class="col-start-2 size-20 place-self-center rounded-full"
      />

      <UserAvatar
        v-else
        :username="user.username"
        class="col-start-2 size-20 place-self-center text-3xl"
      />

      <label class="text-slate-500">Avatar</label>
      <input
        type="file"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <label class="text-slate-500">Site web perso</label>
      <input
        type="text"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <label class="text-slate-500">Chaîne Youtube</label>
      <input
        type="text"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <label class="text-slate-500">Chaîne Twitch</label>
      <input
        type="text"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <button
        class="col-start-2 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90"
      >
        Enregistrer
      </button>
    </form>

    <form
      @submit.prevent="updateUsername"
      class="grid grid-cols-2 items-center gap-5 border-b pb-10"
    >
      <h2 class="col-span-2 text-2xl font-medium text-slate-500">Modifier mon nom d'utilisateur</h2>

      <div
        class="col-span-2 flex items-center gap-4 rounded-lg border border-sky-200 bg-sky-100 p-4 text-sky-600"
      >
        <Icon icon="heroicons:information-circle" class="size-6 shrink-0" />
        <span>Le nom d'utilisateur ne peut être modifié qu'une fois tous les 6 mois.</span>
      </div>

      <label class="text-slate-500">Nom d'utilisateur</label>
      <input
        readOnly
        type="text"
        :value="user.username"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <button
        class="col-start-2 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90"
      >
        Modifier mon nom d'utilisateur
      </button>
    </form>

    <form @submit.prevent="updateEmail" class="grid grid-cols-2 items-center gap-5 border-b pb-10">
      <h2 class="col-span-2 text-2xl font-medium text-slate-500">Modifier mon adresse e-mail</h2>

      <div
        class="col-span-2 flex items-center gap-4 rounded-lg border border-sky-200 bg-sky-100 p-4 text-sky-600"
      >
        <Icon
          :icon="
            user.emailVerifiedAt ? 'heroicons:information-circle' : 'heroicons:shield-exclamation'
          "
          class="size-6 shrink-0"
        />
        <span>
          Adresse e-mail
          {{
            user.emailVerified
              ? user.emailVerifiedAt
                ? `vérifiée le
          ${user.emailVerifiedAt}`
                : 'vérifiée par Discord'
              : 'non vérifiée'
          }}
        </span>

        <Link
          v-if="!user.emailVerified && !user.emailVerifiedAt"
          href="/verify"
          as="button"
          method="post"
          class="ml-auto rounded bg-sky-600 px-2.5 py-1.5 text-sky-100 transition hover:opacity-90"
        >
          Envoyer un nouveau lien
        </Link>
      </div>

      <label class="text-slate-500">Adresse e-mail</label>
      <input
        type="email"
        :value="user.email"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <button
        class="col-start-2 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90"
      >
        Modifier mon adresse e-mail
      </button>
    </form>

    <form
      @submit.prevent="updatePassword"
      class="grid grid-cols-2 items-center gap-5 border-b pb-10"
    >
      <h2 class="col-span-2 text-2xl font-medium text-slate-500">Modifier mon mot de passe</h2>

      <label class="text-slate-500">Mot de passe actuel</label>
      <input
        type="password"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <label class="text-slate-500">Nouveau mot de passe</label>
      <input
        type="password"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <label class="text-slate-500">Confirmation nouveau mot de passe</label>
      <input
        type="password"
        class="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
      />

      <button
        class="col-end-3 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90"
      >
        Modifier mon mot de passe
      </button>
    </form>

    <div class="flex flex-col gap-5 rounded border border-red-300 bg-red-100 p-10">
      <h2 class="text-2xl font-medium text-red-500">Supprimer mon compte</h2>
      <div class="flex items-center justify-between gap-10">
        <p class="leading-relaxed text-red-400">
          Cette action est irreversible. Toutes vos données seront définitivement supprimées.
        </p>
        <button
          @click="deleteAccount"
          class="min-w-52 rounded bg-red-500 px-4 py-3 text-white transition hover:opacity-90"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  </div>
</template>
