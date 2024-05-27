import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, !!request.input('remember'))

    session.flash('notification', {
      type: 'success',
      message: 'Vous êtes connecté.',
    })

    return response.redirect().toRoute('home')
  }
}
