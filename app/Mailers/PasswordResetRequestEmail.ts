import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

export default class PasswordResetRequestEmail extends BaseMailer {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  public prepare(message: MessageContract) {
    const url =
      Env.get('APP_URL') +
      Route.makeUrl('password.reset.create', { token: encodeURIComponent(this.token) })

    message
      .subject(`[${Env.get('APP_TITLE')}] Demande de modification de votre mot de passe`)
      .from(Env.get('APP_EMAIL'))
      .to(this.user.email)
      .htmlView('emails/password-reset-request', { username: this.user.username, url })
  }
}
