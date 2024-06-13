import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DiscordController {
  redirect({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async callback({ ally, auth, response, session }: HttpContext) {
    const discord = ally.use('discord')

    if (discord.accessDenied()) {
      session.flash('error', "Vous avez annulé le processus d'identification.")
      return response.redirect().toRoute('session.create')
    }

    if (discord.stateMisMatch()) {
      session.flash('error', 'La requête a expiré. Veuillez réessayer.')
      return response.redirect().toRoute('session.create')
    }

    if (discord.hasError()) {
      session.flash('error', "Une erreur inattendue s'est produite.")
      return response.redirect().toRoute('session.create')
    }

    const discordUser = await discord.user()

    const userFound = await User.query().where('discord_id', discordUser.id).first()

    if (userFound) {
      await auth.use('web').login(userFound)
      session.flash('success', 'Vous êtes connecté.')
      return response.redirect().toRoute('home')
    }

    const userExists = await User.query()
      .where('email', discordUser.email)
      .orWhere('username', discordUser.nickName)
      .first()

    if (userExists) {
      session.flash('info', 'Cet e-mail est déjà lié à un compte.')
      return response.redirect().toRoute('session.create')
    }

    const newUser = await User.create({
      discordId: discordUser.id,
      username: discordUser.nickName,
      email: discordUser.email,
      avatar: discordUser.avatarUrl,
      emailVerified: discordUser.emailVerificationState === 'verified',
    })

    await newUser.related('profile').create({})

    await auth.use('web').login(newUser)
    session.flash('success', 'Vous êtes connecté.')

    return response.redirect().toRoute('home')
  }
}
