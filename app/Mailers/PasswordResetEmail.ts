import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class PasswordResetEmail extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject(`[${Env.get('APP_TITLE')}] Votre mot de passe a été modifié`)
      .from(Env.get('APP_EMAIL'))
      .to(this.user.email)
      .htmlView('emails/password-reset', { username: this.user.username })
  }
}
