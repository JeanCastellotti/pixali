import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import mail from '@adonisjs/mail/services/main'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create(payload)
    await auth.use('web').login(user, true)
    await mail.sendLater(new VerifyEmailNotification(user))
    response.redirect().toRoute('home')
  }
}
