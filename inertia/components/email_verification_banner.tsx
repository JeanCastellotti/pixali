import { Link, usePage } from '@inertiajs/react'
import { Icon } from '@iconify/react'
import type { SharedProps } from '@adonisjs/inertia/types'

function EmailVerificationBanner() {
  const { authenticated } = usePage<SharedProps>().props

  if (!authenticated) return

  if (authenticated.verified) return

  return (
    <div className="bg-slate-800 py-3">
      <div className="container flex items-center justify-center gap-10">
        <div className="flex items-center gap-2">
          <Icon icon="heroicons:shield-exclamation" className="size-6 text-slate-100" />
          <span className="mt-0.5 text-sm text-slate-100">
            Votre adresse e-mail n'a pas été vérifiée.
          </span>
        </div>
        <Link
          href="/verify"
          as="button"
          method="post"
          className="rounded bg-slate-100 px-2.5 py-1.5 text-xs text-slate-800 transition hover:opacity-80"
        >
          Envoyer un nouveau lien
        </Link>
      </div>
    </div>
  )
}

export default EmailVerificationBanner
