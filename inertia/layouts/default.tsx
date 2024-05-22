import Header from '~/components/header'
import EmailVerificationBanner from '~/components/email_verification_banner'
import Notification from '~/components/notification'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Default({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <EmailVerificationBanner />
      <Header />
      <Notification />
      <main className="container">{children}</main>
    </div>
  )
}

export default Default
