import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'

test.group('Auth email', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should send email verification', async ({ client, assert }) => {
    const mailer = Mail.fake()

    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client.post('/verify').loginAs(user).withCsrfToken().form({})

    assert.isTrue(
      mailer.exists((mail) => mail.subject === '[Pixali] Vérification de votre adresse e-mail')
    )

    response.assertStatus(200)
    response.assertRedirectsToRoute('home')

    Mail.restore()
  })

  test("should verify user's email", async ({ client, assert }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const endpoint = Route.makeSignedUrl(
      'email.verify',
      { email: user.email },
      { expiresIn: '30m' }
    )

    const response = await client.get(endpoint).loginAs(user)

    response.assertStatus(200)
    response.assertRedirectsToRoute('home')

    const updatedUser = await User.findOrFail(user.id)

    assert.isNotNull(updatedUser.emailVerifiedAt)
  })
})
