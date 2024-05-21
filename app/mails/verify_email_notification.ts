import User from '#models/user'
import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { BaseMail } from '@adonisjs/mail'

export default class VerifyEmailNotification extends BaseMail {
  from = env.get('APP_EMAIL')
  subject = 'Vérification de votre adresse e-mail'

  constructor(private user: User) {
    super()
  }

  prepare() {
    const signedURL = router.makeSignedUrl(
      'email.verify',
      { email: this.user.email },
      { expiresIn: '30m' }
    )

    const emailVerificationURL = env.get('APP_URL') + signedURL

    this.message.to(this.user.email)
    this.message.htmlView('emails/verify_email', {
      username: this.user.username,
      emailVerificationURL,
    })
  }
}
