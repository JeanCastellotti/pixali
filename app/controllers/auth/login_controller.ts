import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({}: HttpContext) {}
}
