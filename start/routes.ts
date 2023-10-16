import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})

Route.get('register', 'RegisterController.create')
Route.post('register', 'RegisterController.store')
