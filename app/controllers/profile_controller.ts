import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { assertExists } from '@adonisjs/core/helpers/assert'
import UserPresenter from '#presenters/user_presenter'

export default class ProfileController {
  @inject()
  async handle({ auth, inertia }: HttpContext, presenter: UserPresenter) {
    assertExists(auth.user)
    await auth.user.load('profile')
    return inertia.render('profile', { user: presenter.toJSON(auth.user) })
  }
}
