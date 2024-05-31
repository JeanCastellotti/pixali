import { BaseMail } from '@adonisjs/mail'
import type User from '#models/user'

export default class PasswordResetNotification extends BaseMail {
  constructor(private user: User) {
    super()
  }

  prepare() {
    this.message.to(this.user.email)
    this.message.subject('Votre mot de passe a été modifié')
    this.message.htmlView('emails/password_reset', { username: this.user.username })
  }
}
