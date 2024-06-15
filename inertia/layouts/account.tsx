import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Account({ children }: Props) {
  return (
    <div className="grid grid-cols-3 items-start gap-20">
      <div className="sticky top-5 flex flex-col rounded bg-white">
        <div className="rounded-t bg-slate-700 px-6 py-4 text-slate-100">Mon profil</div>
        <div className="flex flex-col p-2 text-sm text-slate-500">
          <a href="#general-informations" className="rounded px-4 py-2 hover:bg-slate-100">
            Informations générales
          </a>
          <a href="#avatar" className="rounded px-4 py-2 hover:bg-slate-100">
            Avatar
          </a>
          <a href="#username" className="rounded px-4 py-2 hover:bg-slate-100">
            Nom d'utilisateur
          </a>
          <a href="#email" className="rounded px-4 py-2 hover:bg-slate-100">
            Adresse e-mail
          </a>
          <a href="#password" className="rounded px-4 py-2 hover:bg-slate-100">
            Mot de passe
          </a>
          <a href="#delete-account" className="rounded px-4 py-2 hover:bg-slate-100">
            Supprimer mon compte
          </a>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-20">{children}</div>
    </div>
  )
}

export default Account
