import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import EmailValidator from 'App/Validators/EmailValidator'
import { DateTime } from 'luxon'

export default class EmailVerificationController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/resend-verification')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const { email } = await request.validate(EmailValidator)

    const user = await User.findBy('email', email)

    if (user?.emailVerifiedAt) {
      session.flash({
        alert: {
          type: 'info',
          message: 'Cette adresse e-mail a déjà été vérifiée.',
        },
      })

      return response.redirect(auth.isLoggedIn ? '/' : '/login')
    }

    if (user) {
      await new VerifyEmail(user).sendLater()
    }

    session.flash({
      alert: {
        type: 'success',
        message: 'Un lien de vérification vous a été envoyé.',
      },
    })

    return response.redirect(auth.isLoggedIn ? '/' : '/login')
  }

  public async verify({ request, auth, params, session, response }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash({
        alert: {
          type: 'error',
          message: 'Le lien de vérification est invalide ou a expiré.',
        },
      })

      return response.redirect('/verification')
    }

    const user = await User.findByOrFail('email', params.email)

    const redirectTo = auth.isLoggedIn ? 'home' : 'auth.create'

    if (user.emailVerifiedAt) {
      session.flash({
        alert: {
          type: 'info',
          message: 'Cette adresse e-mail a déjà été verifiée.',
        },
      })

      return response.redirect().toRoute(redirectTo)
    }

    user.emailVerifiedAt = DateTime.now()

    await user.save()

    session.flash({
      alert: {
        type: 'success',
        message: 'Votre adresse e-mail a été vérifiée.',
      },
    })

    return response.redirect().toRoute(redirectTo)
  }
}
