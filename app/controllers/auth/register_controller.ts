import mail from '@adonisjs/mail/services/main'
import User from '#models/user'
import VerifyEmailNotification from '#mails/verify_email_notification'
import userCreateValidator from '#validators/user_create_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const payload = await request.validateUsing(userCreateValidator)

    const user = await User.create(payload)
    await user.related('profile').create({})

    await auth.use('web').login(user, true)

    await mail.sendLater(new VerifyEmailNotification(user))

    session.flash('success', 'Votre compte a été créé.')

    return response.redirect().toRoute('home')
  }
}
