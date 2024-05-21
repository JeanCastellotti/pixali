/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const LogoutController = () => import('#controllers/auth/logout_controller')

const RegisterController = () => import('#controllers/auth/register_controller')
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const EmailVerificationController = () => import('#controllers/auth/email_verification_controller')

router.get('/', [HomeController]).as('home')

router
  .get('/register', [RegisterController, 'create'])
  .as('register.create')
  .use(middleware.guest())
router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())

router.get('/login', [LoginController, 'create']).as('login.create').use(middleware.guest())
router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

router.post('/logout', [LogoutController])

router.get('/verify/:email', [EmailVerificationController, 'verify']).as('email.verify')
