import User from '#models/user'
import encryption from '@adonisjs/core/services/encryption'
import type { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import mail from '@adonisjs/mail/services/main'
import passwordResetRequestValidator from '#validators/password_reset_request_validator'
import PasswordResetRequestNotification from '#mails/password_reset_request_notification'

export default class PasswordResetRequestController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  async store({ request, session, response }: HttpContext) {
    const { email } = await request.validateUsing(passwordResetRequestValidator)

    const user = await User.findBy('email', email)

    if (user) {
      const token = encryption.encrypt(string.random(32), '15m')
      await user.merge({ passwordResetToken: token }).save()
      await mail.sendLater(new PasswordResetRequestNotification(user, token))
    }

    session.flash('info', 'Vous allez recevoir un lien pour modifier votre mot de passe.')

    return response.redirect().back()
  }
}
