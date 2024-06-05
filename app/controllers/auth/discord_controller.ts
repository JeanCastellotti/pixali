import Profile from '#models/profile'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DiscordController {
  redirect({ ally }: HttpContext) {
    return ally.use('discord').redirect((request) => {
      request.scopes(['email', 'identify'])
    })
  }

  async callback({ ally, auth, response, session }: HttpContext) {
    const discord = ally.use('discord')

    if (discord.accessDenied()) {
      session.flash('alert', {
        type: 'error',
        message: "Vous avez annulé le processus d'identification",
      })

      return response.redirect().toRoute('session.create')
    }

    if (discord.stateMisMatch() || discord.hasError()) {
      session.flash('alert', {
        type: 'error',
        message: 'Un problème est survenu. Veuillez réessayer.',
      })

      return response.redirect().toRoute('session.create')
    }

    const discordUser = await discord.user()

    // return discordUser

    let user = await User.query().where('discord_id', discordUser.id).first()

    if (user) {
      await auth.use('web').login(user)

      session.flash('alert', {
        type: 'success',
        message: 'Vous êtes connecté.',
      })

      return response.redirect().toRoute('home')
    }

    const userExists = await User.query()
      .where('email', discordUser.email)
      .orWhere('username', discordUser.nickName)
      .first()

    if (userExists) {
      session.flash('alert', {
        type: 'info',
        message: 'Vous avez déjà un compte avec cette adresse e-mail.',
      })

      return response.redirect().toRoute('session.create')
    }

    user = await User.create({
      discordId: discordUser.id,
      username: discordUser.nickName,
      email: discordUser.email,
      avatar: discordUser.avatarUrl,
      emailVerified: discordUser.emailVerificationState === 'verified',
    })

    const profile = new Profile()
    await user.related('profile').save(profile)

    await auth.use('web').login(user)

    session.flash('alert', {
      type: 'success',
      message: 'Vous êtes connecté.',
    })

    return response.redirect().toRoute('home')
  }
}
