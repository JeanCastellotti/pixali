import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    await User.create(payload)
    response.redirect().toRoute('home')
  }
}
