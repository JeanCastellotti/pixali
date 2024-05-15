/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const RegisterController = () => import('#controllers/auth/register_controller')
const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController]).as('home')

router.get('/register', [RegisterController, 'create']).as('register.create')
