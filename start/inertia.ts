/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },
  alert: ({ session }) => session.flashMessages.get('alert'),
  user: ({ auth }) =>
    auth.user && {
      id: auth.user.id,
      username: auth.user.username,
      email: auth.user.email,
      verified: !!auth.user.emailVerifiedAt,
    },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
