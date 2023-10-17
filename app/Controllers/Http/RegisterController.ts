import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class RegisterController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const user = await User.create(payload)
    await auth.login(user, true)
    return response.redirect().toRoute('home')
  }
}
