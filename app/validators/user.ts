import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .alpha()
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)

createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'username.required': "Le nom d'utilisateur est obligatoire",
  'username.alpha': "Le nom d'utilisateur ne peut contenir que des lettres",
  'username.database.unique': "Le nom d'utilisateur est indisponible",
  'email.required': "L'adresse e-mail est obligatoire",
  'email': "L'adresse e-mail n'est pas valide",
  'email.database.unique': "L'adresse e-mail est indisponible",
  'password.required': 'Le mot de passe est obligatoire',
  'password.minLength': 'Le mot de passe doit faire au moins 8 caractères',
})
