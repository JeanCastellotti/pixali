import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import UserMenu from './user_menu'

function Header() {
  const { url, props } = usePage()

  return (
    <header className="sticky top-0 z-50 mb-6 border-b bg-white/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-12">
        <Link href="/" className="relative -top-0.5">
          <img src="/logo.png" alt="Logo Pixali" />
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-500">
          <Link href="/" className={clsx('hover:text-amber-500', url === '/' && 'text-slate-700')}>
            Accueil
          </Link>
          <Link
            href="/threads"
            className={clsx('hover:text-amber-500', url === '/threads' && 'text-slate-700')}
          >
            Discussions
          </Link>
          <Link
            href="/posts"
            className={clsx('hover:text-amber-500', url === '/posts' && 'text-slate-700')}
          >
            Articles
          </Link>
          <Link
            href="/tests"
            className={clsx('hover:text-amber-500', url === '/tests' && 'text-slate-700')}
          >
            Tests
          </Link>
        </nav>

          {props.user ? (
            <UserMenu user={props.user} />
          ) : (
          <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded border border-slate-600 bg-slate-500 px-2 py-1.5 text-sm text-white transition hover:opacity-80"
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="rounded border border-amber-600 bg-amber-500 px-2 py-1.5 text-sm text-white transition hover:opacity-80"
              >
                Créer un compte
              </Link>
          </div>
          )}
      </div>
    </header>
  )
}

export default Header
