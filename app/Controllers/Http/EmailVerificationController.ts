import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EmailVerificationController {
  public async send({ auth, session, response }: HttpContextContract) {
    await new VerifyEmail(auth.user!).sendLater()

    session.flash('alert', {
      type: 'info',
      message: 'Un nouveau lien de vérification vous a été envoyé.',
    })

    return response.redirect().back()
  }

  public async verify({ request, auth, params, session, response }: HttpContextContract) {
    const redirectTo = auth.isLoggedIn ? 'home' : 'auth.create'

    if (!request.hasValidSignature()) {
      session.flash('alert', {
        type: 'error',
        message: 'Le lien de vérification est invalide ou a expiré.',
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
