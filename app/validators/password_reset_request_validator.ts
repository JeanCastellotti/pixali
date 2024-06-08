import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const passwordResetRequestValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
  })
)

passwordResetRequestValidator.messagesProvider = new SimpleMessagesProvider({
  email: "Le format de l'adresse email est incorrect",
})

export default passwordResetRequestValidator
