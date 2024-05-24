import type { HttpContext } from '@adonisjs/core/http'

export default class PasswordResetRequestController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password')
  }

  async store() {}
}
