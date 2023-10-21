import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth register', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should register a user', async ({ client, assert }) => {
    const response = await client.post('/register').withCsrfToken().form({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const user = await User.findBy('username', 'test')

    response.assertStatus(200)
    response.assertRedirectsToRoute('home')
    assert.exists(user)
  })

  test('should fail when username exists', async ({ client }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        username: user.username,
        email: 'test2@email.io',
        password: 'Password!1234',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should fail when email exists', async ({ client }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        username: 'test2',
        email: user.email,
        password: 'Password!1234',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should fail when username is too short', async ({ client }) => {
    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        username: 'te',
        email: 'test@email.io',
        password: 'Password!1234',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should fail when username is too long', async ({ client }) => {
    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        username: 'testtestestestest',
        email: 'test@email.io',
        password: 'Password!1234',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should fail when email is invalid', async ({ client }) => {
    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        username: 'test',
        email: 'test@email',
        password: 'Password!1234',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should fail when password is too short', async ({ client }) => {
    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        username: 'test',
        email: 'test@email.io',
        password: 'Pass',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should fail with invalid payload', async ({ client }) => {
    const response = await client
      .post('/register')
      .header('Referer', '/register')
      .withCsrfToken()
      .form({
        foo: 'test',
        bar: 'test@email.io',
        baz: 'Password!1234',
      })

    response.assertStatus(200)
    response.assertRedirectsToRoute('register.create')
  })

  test('should redirect authenticated user', async ({ client }) => {
    const user = await User.create({
      username: 'test',
      email: 'test@email.io',
      password: 'Password!1234',
    })

    const response = await client.get('/register').loginAs(user)

    response.assertRedirectsToRoute('home')
  })
})
