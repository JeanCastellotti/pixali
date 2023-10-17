import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('home').as('home')

Route.group(() => {
  Route.get('login', 'AuthController.create')
  Route.post('login', 'AuthController.store')
  Route.get('register', 'RegisterController.create')
  Route.post('register', 'RegisterController.store')
}).middleware('guest')

Route.post('/logout', 'AuthController.destroy')
