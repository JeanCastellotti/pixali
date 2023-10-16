import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([
      rules.trim(),
      rules.alpha(),
      rules.minLength(3),
      rules.maxLength(12),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'required': 'Obligatoire',
    'unique': 'Indisponible',
    'username.alpha': 'Que des lettres',
    'username.minLength': 'Au moins 3 caractères',
    'username.maxLength': 'Pas plus de 12 caractères',
    'email': 'Incorrecte',
    'password.minLength': 'Au moins 8 caractères',
  }
}
