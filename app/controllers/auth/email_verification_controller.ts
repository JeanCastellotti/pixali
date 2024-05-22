import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import { assertExists } from '@adonisjs/core/helpers/assert'

export default class EmailVerificationController {
  async send({ auth, session, response }: HttpContext) {
    assertExists(auth.user)
    await mail.sendLater(new VerifyEmailNotification(auth.user))
    session.flash('alert', {
      type: 'info',
      message: 'Un nouveau lien de vérification vous a été envoyé',
    })
    response.redirect().back()
  }

  async verify({ request, auth, params, response }: HttpContext) {
    const redirectTo = auth.isAuthenticated ? 'home' : 'login.create'

    if (!request.hasValidSignature()) {
      return response.redirect().toRoute(redirectTo)
    }

    const user = auth.user ?? (await User.findByOrFail('email', params.email))

    if (user.emailVerifiedAt) {
      return response.redirect().toRoute(redirectTo)
    }

    user.emailVerifiedAt = DateTime.now()

    await user.save()

    response.redirect().toRoute(redirectTo)
  }
}
