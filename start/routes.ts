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
const LoginController = () => import('#controllers/auth/login_controller')

router.get('/', [HomeController]).as('home')

router.get('/register', [RegisterController, 'create']).as('register.create')
router.post('/register', [RegisterController, 'store']).as('register.store')

router.get('/login', [LoginController, 'create']).as('login.create')
