import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class RegisterController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)

    await auth.login(user, true)

    await new VerifyEmail(user).sendLater()

    session.flash('alert', {
      type: 'success',
      message: `Votre compte a été créé ! Vous allez recevoir un lien pour vérifier votre adresse e-mail.`,
    })

    return response.redirect().toRoute('home')
  }
}
