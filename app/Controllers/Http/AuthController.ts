import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    await auth.attempt(email, password, true)
    return response.redirect().toRoute('home')
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('home')
  }
}
