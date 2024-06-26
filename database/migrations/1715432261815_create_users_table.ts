import Roles from '#enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('discord_id')
      table.integer('role_id').unsigned().references('roles.id').defaultTo(Roles.USER)
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('avatar')
      table.string('password')
      table.string('password_reset_token')
      table.boolean('email_verified')
      table.timestamp('email_verified_at')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
