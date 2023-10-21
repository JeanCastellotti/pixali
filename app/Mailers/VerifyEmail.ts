import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

export default class VerifyEmail extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    let url = Route.makeSignedUrl('email.verify', { email: this.user.email }, { expiresIn: '30m' })

    url = Env.get('APP_URL') + url

    message
      .subject(`[${Env.get('APP_TITLE')}] Vérification de votre adresse e-mail`)
      .from(Env.get('APP_EMAIL'), Env.get('APP_TITLE'))
      .to(this.user.email)
      .htmlView('emails/verify-email', { user: this.user, url })
  }
}
