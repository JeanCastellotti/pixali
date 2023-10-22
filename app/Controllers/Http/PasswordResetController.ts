import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'
import PasswordResetValidator from 'App/Validators/PasswordResetValidator'
import PasswordResetEmail from 'App/Mailers/PasswordResetEmail'

export default class PasswordResetController {
  public async create({ params, view, session, response }: HttpContextContract) {
    const user = await User.findBy('password_reset_token', decodeURIComponent(params.token))

    if (!user || !Encryption.decrypt(user.passwordResetToken!)) {
      session.flash('alert', {
        type: 'error',
        message: 'Le lien est invalide ou a expiré.',
      })

      return response.redirect().toRoute('password.forgot.create')
    }

    return view.render('auth/reset-password', {
      token: user.passwordResetToken,
      email: user.email,
    })
  }

  public async store({ request, session, response }: HttpContextContract) {
    const { password, token } = await request.validate(PasswordResetValidator)

    const user = await User.findBy('password_reset_token', token)

    if (!user) {
      session.flash('alert', {
        type: 'error',
        message: 'Le lien est invalide ou a expiré.',
      })

      return response.redirect().toRoute('password.forgot.create')
    }

    await user.merge({ password, passwordResetToken: null }).save()

    await new PasswordResetEmail(user).sendLater()

    session.flash('alert', {
      type: 'success',
      message: 'Votre mot de passe a été modifié.',
    })

    return response.redirect().toRoute('auth.create')
  }
}
