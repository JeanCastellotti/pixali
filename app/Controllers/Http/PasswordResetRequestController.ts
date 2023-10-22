import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import EmailValidator from 'App/Validators/EmailValidator'
import Encryption from '@ioc:Adonis/Core/Encryption'
import { string } from '@ioc:Adonis/Core/Helpers'
import PasswordResetRequestEmail from 'App/Mailers/PasswordResetRequestEmail'

export default class PasswordResetRequestController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/forgot-password')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const { email } = await request.validate(EmailValidator)

    const user = await User.findBy('email', email)

    if (user) {
      const token = Encryption.encrypt(string.generateRandom(32), '15m')

      await user.merge({ passwordResetToken: token }).save()

      await new PasswordResetRequestEmail(user, token).sendLater()
    }

    session.flash('alert', {
      type: 'info',
      message: 'Vous allez recevoir un lien pour modifier votre mot de passe.',
    })

    return response.redirect().back()
  }
}
