import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ inertia }) => {
  return inertia.render('Home')
}).as('home')

Route.get('/login', 'AuthController.create').as('auth.create').middleware('guest')
Route.post('/login', 'AuthController.store').middleware('guest')

Route.get('/register', 'RegisterController.create').as('register.create').middleware('guest')
Route.post('/register', 'RegisterController.store').middleware('guest')

Route.post('/logout', 'AuthController.destroy').as('auth.logout').middleware('auth')

Route.post('/verify', 'EmailVerificationController.send').as('email.send').middleware('auth')
Route.get('/verify/:email', 'EmailVerificationController.verify').as('email.verify')

Route.get('/forgot-password', 'PasswordResetRequestController.create').as('password.forgot.create')
Route.post('/forgot-password', 'PasswordResetRequestController.store')

Route.get('/reset-password/:token', 'PasswordResetController.create').as('password.reset.create')
Route.post('/reset-password', 'PasswordResetController.store').as('password.reset.store')

Route.get('/threads', ({ inertia }) => {
  return inertia.render('Threads')
})

Route.get('/posts', ({ inertia }) => {
  return inertia.render('Posts')
})

Route.get('/reviews', ({ inertia }) => {
  return inertia.render('Reviews')
})
