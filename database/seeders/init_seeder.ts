import Roles from '#enums/roles'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    Role.createMany([
      { id: Roles.USER, name: 'User' },
      { id: Roles.MODERATOR, name: 'Moderator' },
      { id: Roles.ADMINISTRATOR, name: 'Administrator' },
    ])
  }
}
