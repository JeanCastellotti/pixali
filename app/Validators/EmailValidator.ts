import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.trim(), rules.email()]),
  })

  public messages: CustomMessages = {
    required: 'Obligatoire',
    email: 'Incorrecte',
  }
}
