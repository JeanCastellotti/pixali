import Header from '~/components/header'
import EmailVerificationBanner from '~/components/email_verification_banner'
import UserMenu from '~/components/user_menu'
import MainNav from '~/components/main_nav'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Default({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <EmailVerificationBanner />
      <Header>
        <MainNav />
        <UserMenu />
      </Header>
      <main className="container">{children}</main>
    </div>
  )
}

export default Default
