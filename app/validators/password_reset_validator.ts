import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const passwordResetValidator = vine.compile(
  vine.object({
    token: vine.string(),
    password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirmation' }),
  })
)

passwordResetValidator.messagesProvider = new SimpleMessagesProvider({
  'password.minLength': 'Le mot de passe doit faire au moins 8 caractères',
  'password.confirmed': 'Les mots de passe ne correspondent pas',
})

export default passwordResetValidator
