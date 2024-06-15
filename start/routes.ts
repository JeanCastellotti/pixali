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

const HomeController = () => import('#controllers/home_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const SessionController = () => import('#controllers/auth/session_controller')
const EmailVerificationController = () => import('#controllers/auth/email_verification_controller')
const PasswordResetController = () => import('#controllers/auth/password_reset_controller')
const PasswordResetRequestController = () =>
  import('#controllers/auth/password_reset_request_controller')
const DiscordController = () => import('#controllers/auth/discord_controller')
const ProfileController = () => import('#controllers/profile_controller')

router.get('/', [HomeController]).as('home')

router.get('register', [RegisterController, 'create']).as('register.create').use(middleware.guest())
router.post('register', [RegisterController, 'store']).as('register.store').use(middleware.guest())

router.get('login', [SessionController, 'create']).as('session.create').use(middleware.guest())
router.post('login', [SessionController, 'store']).as('session.store').use(middleware.guest())
router.post('logout', [SessionController, 'destroy']).as('session.destroy').use(middleware.auth())

router.post('verify', [EmailVerificationController, 'send']).as('email.send')
router.get('verify/:email', [EmailVerificationController, 'verify']).as('email.verify')

router
  .get('forgot-password', [PasswordResetRequestController, 'create'])
  .as('password.forgot.create')
router
  .post('forgot-password', [PasswordResetRequestController, 'store'])
  .as('password.forgot.store')

router.get('reset-password/:token', [PasswordResetController, 'create']).as('password.reset.create')
router.post('reset-password', [PasswordResetController, 'store']).as('password.reset.store')

router.get('/account/profile', [ProfileController]).as('user.profile')

router.get('/discord/redirect', [DiscordController, 'redirect']).as('discord.redirect')
router.get('/discord/callback', [DiscordController, 'callback']).as('discord.callback')
