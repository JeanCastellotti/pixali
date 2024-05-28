import mail from '@adonisjs/mail/services/main'
import { assertExists } from '@adonisjs/core/helpers/assert'
import type { HttpContext } from '@adonisjs/core/http'
import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class EmailVerificationController {
  async send({ auth, session, response }: HttpContext) {
    assertExists(auth.user)

    await mail.sendLater(new VerifyEmailNotification(auth.user))

    session.flash('alert', {
      type: 'info',
      message: 'Un nouveau lien de vérification vous a été envoyé.',
    })

    return response.redirect().back()
  }

  async verify({ request, auth, params, session, response }: HttpContext) {
    const redirectTo = auth.isAuthenticated ? 'home' : 'session.create'

    if (!request.hasValidSignature()) {
      session.flash('alert', {
        type: 'error',
        message: 'Le lien est invalide ou a expiré.',
      })

      return response.redirect().toRoute(redirectTo)
    }

    const user = auth.user ?? (await User.findByOrFail('email', params.email))

    if (user.emailVerifiedAt) {
      session.flash('alert', {
        type: 'info',
        message: 'Votre adresse e-mail a déjà été verifiée.',
      })

      return response.redirect().toRoute(redirectTo)
    }

    user.emailVerifiedAt = DateTime.now()

    await user.save()

    session.flash('alert', {
      type: 'success',
      message: 'Votre adresse e-mail a été vérifiée.',
    })

    return response.redirect().toRoute(redirectTo)
  }
}
