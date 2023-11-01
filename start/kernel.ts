import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:Adonis/Addons/Shield'),
  () => import('App/Middleware/SilentAuth'),
  () => import('@ioc:EidelLev/Inertia/Middleware'),
])

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  guest: () => import('App/Middleware/Guest'),
})
