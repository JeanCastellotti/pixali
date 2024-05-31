import { BaseMail } from '@adonisjs/mail'
import router from '@adonisjs/core/services/router'
import env from '#start/env'
import type User from '#models/user'

export default class VerifyEmailNotification extends BaseMail {
  subject = 'Vérification de votre adresse e-mail'

  constructor(private user: User) {
    super()
  }

  prepare() {
    const emailVerificationURL = router
      .builder()
      .prefixUrl(env.get('APP_URL'))
      .params({ email: this.user.email })
      .makeSigned('email.verify', {
        expiresIn: '24h',
      })

    this.message.to(this.user.email)
    this.message.htmlView('emails/verify_email', {
      username: this.user.username,
      emailVerificationURL,
    })
  }
}
