import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class EmailVerificationController {
  async send({}: HttpContext) {}

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
