import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth login', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should login a user', async ({ client }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client.post('/login').withCsrfToken().form({
      email: user.email,
      password: 'Password!1234',
    })

    console.log(response.flashMessages())

    response.assertStatus(200)
    response.assertRedirectsToRoute('home')
  })

  test('should fail to login with invalid credentials', async ({ client }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client.post('/login').header('Referer', '/login').withCsrfToken().form({
      email: user.email,
      password: 'Password!12345',
    })

    response.assertStatus(200)
    response.assertRedirectsToRoute('auth.create')
  })

  test('should redirect authenticated user', async ({ client }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client.get('/login').loginAs(user)

    response.assertRedirectsToRoute('home')
  })

  test('should fail with invalid payload', async ({ client }) => {
    const response = await client.post('/login').header('Referer', '/login').withCsrfToken().form({
      username: 'test',
      password: 'Password!1234',
    })

    response.assertStatus(200)
    response.assertRedirectsToRoute('auth.create')
  })
})
