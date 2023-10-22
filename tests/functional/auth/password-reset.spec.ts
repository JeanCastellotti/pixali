import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth password reset', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should send password reset email', async ({ client, assert }) => {
    const mailer = Mail.fake()

    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client
      .post('/forgot-password')
      .header('Referer', '/forgot-password')
      .withCsrfToken()
      .form({
        email: user.email,
      })

    const subject = '[Pixali] Demande de modification de votre mot de passe'

    assert.isTrue(mailer.exists((mail) => mail.subject === subject))

    response.assertStatus(200)
    response.assertRedirectsToRoute('password.forgot.create')

    const updatedUser = await User.findOrFail(user.id)

    assert.isNotNull(updatedUser.passwordResetToken)

    Mail.restore()
  })

  test('should fail with invalid token', async ({ client }) => {
    await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
      passwordResetToken: 'fake_token',
    })

    const response = await client.get('/reset-password/invalid_token')

    response.assertStatus(200)
    response.assertRedirectsToRoute('password.forgot.create')
  })

  test('should update user password', async ({ client, assert }) => {
    const mailer = Mail.fake()

    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
      passwordResetToken: 'fake_token',
    })

    const response = await client
      .post('/reset-password')
      .header('Referer', `/reset-password/${user.passwordResetToken}`)
      .withCsrfToken()
      .form({
        token: user.passwordResetToken,
        email: user.email,
        password: 'UpdatedPassword',
        password_confirmation: 'UpdatedPassword',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('auth.create')

    const subject = '[Pixali] Votre mot de passe a été modifié'

    assert.isTrue(mailer.exists((mail) => mail.subject === subject))

    const updatedUser = await User.findOrFail(user.id)

    assert.isNull(updatedUser.passwordResetToken)

    Mail.restore()
  })
})
