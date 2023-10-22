import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PasswordResetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.trim(), rules.confirmed(), rules.minLength(8)]),
    token: schema.string(),
  })

  public messages: CustomMessages = {
    'required': 'Obligatoire',
    'email': 'Incorrecte',
    'password.minLength': 'Au moins 8 caractères',
    'password_confirmation.confirmed': 'Ne correspond pas',
  }
}
