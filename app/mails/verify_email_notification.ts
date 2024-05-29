import User from '#models/user'
import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { BaseMail } from '@adonisjs/mail'

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
        expiresIn: '30m',
      })

    this.message.to(this.user.email)
    this.message.htmlView('emails/verify_email', {
      username: this.user.username,
      emailVerificationURL,
    })
  }
}
