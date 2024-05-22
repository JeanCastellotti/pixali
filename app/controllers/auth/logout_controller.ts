import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.flash('notification', {
      type: 'success',
      message: 'Vous avez été déconnecté.',
    })
    response.redirect().toRoute('home')
  }
}
