import { BaseMail } from '@adonisjs/mail'
import router from '@adonisjs/core/services/router'
import env from '#start/env'
import type User from '#models/user'

export default class PasswordResetRequestNotification extends BaseMail {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  prepare() {
    console.log(encodeURIComponent(this.token))

    const passwordResetURL = router
      .builder()
      .prefixUrl(env.get('APP_URL'))
      .params({ token: encodeURIComponent(this.token) })
      .make('password.reset.create')

    this.message.to(this.user.email)
    this.message.subject('Demande de modification de votre mot de passe')
    this.message.htmlView('emails/password_reset_request', {
      username: this.user.username,
      passwordResetURL,
    })
  }
}
