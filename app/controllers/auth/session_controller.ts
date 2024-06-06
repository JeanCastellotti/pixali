import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, !!request.input('remember'))

    session.flash('success', 'Vous êtes connecté.')

    return response.redirect().toRoute('home')
  }

  async destroy({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'Vous avez été déconnecté.')

    return response.redirect().toRoute('home')
  }
}
