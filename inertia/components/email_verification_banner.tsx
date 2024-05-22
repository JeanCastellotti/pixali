import { Link, usePage } from '@inertiajs/react'
import { ShieldExclamationIcon } from '@heroicons/react/24/solid'

type InertiaUser = {
  id: number
  username: string
  email: string
  emailVerifiedAt: string
  createdAt: string
  updatedAt: string
}

function EmailVerificationBanner() {
  const user = usePage().props.user as InertiaUser

  if (!user) return

  if (user.emailVerifiedAt) return

  return (
    <div className="bg-amber-500 py-3">
      <div className="container flex items-center justify-center gap-6 text-sm text-amber-50">
        <ShieldExclamationIcon className="size-6" />
        <span>Votre adresse e-mail n'a pas été vérifiée.</span>
        <Link
          href="/verify"
          as="button"
          method="post"
          className="rounded border-2 border-transparent bg-amber-50 px-2.5 py-1.5 text-amber-500 transition hover:opacity-80"
        >
          Envoyer un nouveau lien
        </Link>
      </div>
    </div>
  )
}

export default EmailVerificationBanner
