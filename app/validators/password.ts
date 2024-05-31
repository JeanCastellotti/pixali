import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const passwordResetRequestValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)

passwordResetRequestValidator.messagesProvider = new SimpleMessagesProvider({
  email: "Le format de l'adresse email est incorrect",
})

export const passwordResetValidator = vine.compile(
  vine.object({
    token: vine.string(),
    password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirmation' }),
  })
)

passwordResetValidator.messagesProvider = new SimpleMessagesProvider({
  'password.confirmed': 'Les mots de passe ne correspondent pas',
})
