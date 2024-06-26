import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const userCreateValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .alphaNumeric()
      .minLength(3)
      .maxLength(12)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)

userCreateValidator.messagesProvider = new SimpleMessagesProvider({
  'username.required': "Le nom d'utilisateur est obligatoire",
  'username.alphaNumeric': "Le nom d'utilisateur ne peut contenir que des chiffres et des lettres",
  'username.minLength': "Le nom d'utilisateur doit faire au moins 3 caractères",
  'username.maxLength': "Le nom d'utilisateur ne doit pas dépasser 12 caractères",
  'username.database.unique': "Le nom d'utilisateur est indisponible",
  'email.required': "L'adresse e-mail est obligatoire",
  'email': "Le format de l'adresse e-mail est incorrect",
  'email.database.unique': "L'adresse e-mail est indisponible",
  'password.required': 'Le mot de passe est obligatoire',
  'password.minLength': 'Le mot de passe doit faire au moins 8 caractères',
})

export default userCreateValidator
