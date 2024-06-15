import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from '@inertiajs/react'
import type ProfileController from '#controllers/profile_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'

function Profile({ user }: InferPageProps<ProfileController, 'handle'>) {
  return (
    <>
      <form className="grid grid-cols-3 items-center gap-5">
        <h2
          id="general-informations"
          className="col-span-3 border-b border-slate-200 pb-5 text-2xl font-medium text-slate-500"
        >
          Information générales
        </h2>

        <label className="text-slate-500">Site web perso</label>
        <input
          type="text"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <label className="text-slate-500">Chaîne Youtube</label>
        <input
          type="text"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <label className="text-slate-500">Chaîne Twitch</label>
        <input
          type="text"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <button className="col-start-3 place-self-end rounded bg-slate-700 px-3 py-2 text-white transition hover:opacity-90">
          Enregistrer
        </button>
      </form>

      <form className="grid grid-cols-3 items-center gap-5">
        <h2
          id="avatar"
          className="col-span-3 border-b border-slate-200 pb-5 text-2xl font-medium text-slate-500"
        >
          Avatar
        </h2>

        <label className="text-slate-500">Avatar</label>
        <input
          type="file"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <button className="col-start-3 place-self-end rounded bg-slate-700 px-3 py-2 text-white transition hover:opacity-90">
          Modifier mon avatar
        </button>
      </form>

      <form className="grid grid-cols-2 items-center gap-5">
        <h2
          id="username"
          className="col-span-3 border-b border-slate-200 pb-5 text-2xl font-medium text-slate-500"
        >
          Modifier mon nom d'utilisateur
        </h2>

        <div className="col-span-3 flex items-center gap-4 rounded-lg border border-sky-200 bg-sky-100 p-4 text-sky-600">
          <Icon icon="heroicons:information-circle" className="size-6 shrink-0" />
          <span className="text-sm">
            Le nom d'utilisateur ne peut être modifié qu'une fois tous les 6 mois.
          </span>
        </div>

        <label className="text-slate-500">Nom d'utilisateur</label>
        <input
          readOnly
          type="text"
          value={user.username}
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <button className="col-start-3 place-self-end rounded bg-slate-700 px-3 py-2 text-white transition hover:opacity-90">
          Modifier mon nom d'utilisateur
        </button>
      </form>

      <form className="grid grid-cols-2 items-center gap-5">
        <h2
          id="email"
          className="col-span-3 border-b border-slate-200 pb-5 text-2xl font-medium text-slate-500"
        >
          Modifier mon adresse e-mail
        </h2>

        <div className="col-span-3 flex items-center gap-4 rounded-lg border border-sky-200 bg-sky-100 p-4 text-sky-600">
          <Icon
            icon={
              user.emailVerifiedAt ? 'heroicons:information-circle' : 'heroicons:shield-exclamation'
            }
            className="size-6 shrink-0"
          />
          <span className="text-sm">
            Adresse e-mail{' '}
            {user.emailVerified
              ? user.emailVerifiedAt
                ? `vérifiée le ${user.emailVerifiedAt}`
                : 'vérifiée par Discord'
              : 'non vérifiée'}
          </span>

          {!user.emailVerified && !user.emailVerifiedAt && (
            <Link
              href="/verify"
              as="button"
              preserveScroll
              method="post"
              className="ml-auto rounded bg-sky-600 px-2.5 py-1.5 text-sm text-sky-100 transition hover:opacity-90"
            >
              Envoyer un nouveau lien
            </Link>
          )}
        </div>

        <label className="text-slate-500">Adresse e-mail</label>
        <input
          readOnly
          type="email"
          value={user.email}
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <button className="col-start-3 place-self-end rounded bg-slate-700 px-3 py-2 text-white transition hover:opacity-90">
          Modifier mon adresse e-mail
        </button>
      </form>

      <form className="grid grid-cols-2 items-center gap-5">
        <h2
          id="password"
          className="col-span-3 border-b border-slate-200 pb-5 text-2xl font-medium text-slate-500"
        >
          Modifier mon mot de passe
        </h2>

        <label className="text-slate-500">Mot de passe actuel</label>
        <input
          type="password"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <label className="text-slate-500">Nouveau mot de passe</label>
        <input
          type="password"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <label className="text-slate-500">Confirmation nouveau mot de passe</label>
        <input
          type="password"
          className="col-span-2 rounded border border-slate-300 p-3 text-slate-500 focus:outline-none"
        />

        <button className="col-start-3 place-self-end rounded bg-slate-700 px-3 py-2 text-white transition hover:opacity-90">
          Modifier mon mot de passe
        </button>
      </form>

      <div className="flex flex-col gap-5 rounded border border-red-300 bg-red-100 p-10">
        <h2 id="delete-account" className="text-2xl font-medium text-red-500">
          Supprimer mon compte
        </h2>
        <div className="flex items-center justify-between gap-10">
          <p className="leading-relaxed text-red-400">
            Cette action est irreversible. Toutes vos données seront définitivement supprimées.
          </p>
          <button className="min-w-52 rounded bg-red-500 px-3 py-2 text-white transition hover:opacity-90">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile
