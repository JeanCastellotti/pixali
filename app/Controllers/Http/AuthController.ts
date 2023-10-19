import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    try {
      await auth.attempt(email, password, true)

      session.flash({
        alert: {
          type: 'success',
          message: 'Vous êtes connecté',
        },
      })
    } catch (error) {
      session.flash({
        alert: {
          type: 'error',
          message: "Nous n'avons pas pu vous identifier",
        },
      })

      return response.redirect().back()
    }

    return response.redirect().toRoute('home')
  }

  public async destroy({ auth, session, response }: HttpContextContract) {
    await auth.logout()

    session.flash({
      alert: {
        type: 'success',
        message: 'Vous avez été déconnecté',
      },
    })

    return response.redirect().toRoute('home')
  }
}
