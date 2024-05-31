import PasswordResetNotification from '#mails/password_reset_notification'
import User from '#models/user'
import { passwordResetValidator } from '#validators/password'
import type { HttpContext } from '@adonisjs/core/http'
import encryption from '@adonisjs/core/services/encryption'
import mail from '@adonisjs/mail/services/main'

export default class PasswordResetController {
  async create({ params, inertia, session, response }: HttpContext) {
    const user = await User.findBy('passwordResetToken', decodeURIComponent(params.token))

    if (!user || !encryption.decrypt(user.passwordResetToken)) {
      session.flash('alert', {
        type: 'error',
        message: 'Le lien est invalide ou a expiré.',
      })

      return response.redirect().toRoute('password.forgot.create')
    }

    return inertia.render('auth/reset_password', {
      token: user.passwordResetToken,
      email: user.email,
    })
  }

  async store({ request, session, response }: HttpContext) {
    const { password, token } = await request.validateUsing(passwordResetValidator)

    const user = await User.findBy('passwordResetToken', token)

    if (!user) {
      session.flash('alert', {
        type: 'error',
        message: 'Le lien est invalide ou a expiré.',
      })

      return response.redirect().toRoute('password.forgot.create')
    }

    await user.merge({ password, passwordResetToken: null }).save()

    await mail.sendLater(new PasswordResetNotification(user))

    session.flash('alert', {
      type: 'success',
      message: 'Votre mot de passe a été modifié.',
    })

    return response.redirect().toRoute('session.create')
  }
}
