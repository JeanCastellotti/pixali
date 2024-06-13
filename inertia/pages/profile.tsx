import { Icon } from '@iconify/react/dist/iconify.js'
import { Head, Link } from '@inertiajs/react'
import type ProfileController from '#controllers/profile_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import Avatar from '~/components/avatar'

function Profile({ user }: InferPageProps<ProfileController, 'handle'>) {
  function updateDetails(e: React.FormEvent) {
    e.preventDefault()
  }

  function updateUsername(e: React.FormEvent) {
    e.preventDefault()
  }

  function updateEmail(e: React.FormEvent) {
    e.preventDefault()
  }

  function updatePassword(e: React.FormEvent) {
    e.preventDefault()
  }

  function deleteAccount() {}

  return (
    <>
      <Head title="Profil"></Head>

      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-bold tracking-wide text-slate-800">Profil</h1>

        <form
          onSubmit={updateDetails}
          className="grid grid-cols-2 items-center gap-5 border-b pb-10"
        >
          <h2 className="col-span-2 text-2xl font-medium text-slate-500">Information générales</h2>

          {user.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="col-start-2 size-20 place-self-center rounded-full"
            />
          ) : (
            <Avatar
              username={user.username}
              className="col-start-2 size-20 place-self-center text-3xl"
            />
          )}

          <label className="text-slate-500">Avatar</label>
          <input
            type="file"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <label className="text-slate-500">Site web perso</label>
          <input
            type="text"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <label className="text-slate-500">Chaîne Youtube</label>
          <input
            type="text"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <label className="text-slate-500">Chaîne Twitch</label>
          <input
            type="text"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <button className="col-start-2 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90">
            Enregistrer
          </button>
        </form>

        <form
          onSubmit={updateUsername}
          className="grid grid-cols-2 items-center gap-5 border-b pb-10"
        >
          <h2 className="col-span-2 text-2xl font-medium text-slate-500">
            Modifier mon nom d'utilisateur
          </h2>

          <div className="col-span-2 flex items-center gap-4 rounded-lg border border-sky-200 bg-sky-100 p-4 text-sky-600">
            <Icon icon="heroicons:information-circle" className="size-6 shrink-0" />
            <span>Le nom d'utilisateur ne peut être modifié qu'une fois tous les 6 mois.</span>
          </div>

          <label className="text-slate-500">Nom d'utilisateur</label>
          <input
            readOnly
            type="text"
            value={user.username}
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <button className="col-start-2 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90">
            Modifier mon nom d'utilisateur
          </button>
        </form>

        <form onSubmit={updateEmail} className="grid grid-cols-2 items-center gap-5 border-b pb-10">
          <h2 className="col-span-2 text-2xl font-medium text-slate-500">
            Modifier mon adresse e-mail
          </h2>

          <div className="col-span-2 flex items-center gap-4 rounded-lg border border-sky-200 bg-sky-100 p-4 text-sky-600">
            <Icon
              icon={
                user.emailVerifiedAt
                  ? 'heroicons:information-circle'
                  : 'heroicons:shield-exclamation'
              }
              className="size-6 shrink-0"
            />
            <span>
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
                method="post"
                className="ml-auto rounded bg-sky-600 px-2.5 py-1.5 text-sky-100 transition hover:opacity-90"
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
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <button className="col-start-2 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90">
            Modifier mon adresse e-mail
          </button>
        </form>

        <form
          onSubmit={updatePassword}
          className="grid grid-cols-2 items-center gap-5 border-b pb-10"
        >
          <h2 className="col-span-2 text-2xl font-medium text-slate-500">
            Modifier mon mot de passe
          </h2>

          <label className="text-slate-500">Mot de passe actuel</label>
          <input
            type="password"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <label className="text-slate-500">Nouveau mot de passe</label>
          <input
            type="password"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <label className="text-slate-500">Confirmation nouveau mot de passe</label>
          <input
            type="password"
            className="rounded border border-slate-300 p-4 text-slate-500 focus:outline-none"
          />

          <button className="col-end-3 place-self-end rounded bg-slate-700 px-4 py-3 text-white transition hover:opacity-90">
            Modifier mon mot de passe
          </button>
        </form>

        <div className="flex flex-col gap-5 rounded border border-red-300 bg-red-100 p-10">
          <h2 className="text-2xl font-medium text-red-500">Supprimer mon compte</h2>
          <div className="flex items-center justify-between gap-10">
            <p className="leading-relaxed text-red-400">
              Cette action est irreversible. Toutes vos données seront définitivement supprimées.
            </p>
            <button
              onClick={deleteAccount}
              className="min-w-52 rounded bg-red-500 px-4 py-3 text-white transition hover:opacity-90"
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
