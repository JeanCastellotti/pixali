import { Button, Field, Input, Label } from '@headlessui/react'
import { Head, useForm } from '@inertiajs/react'
import clsx from 'clsx'
import Spinner from '~/components/spinner'

type Props = {
  email: string
  token: string
}

function ResetPassword({ email, token }: Props) {
  const form = useForm({
    password: '',
    passwordConfirmation: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (form.processing) return

    form.transform((data) => ({
      ...data,
      token,
    }))

    form.post('/reset-password', {
      onFinish() {
        form.reset()
      },
    })
  }

  return (
    <>
      <Head title="Modifier mot de passe" />

      <h1 className="mb-6 text-4xl font-medium text-slate-700">Modifier mot de passe</h1>

      <form onSubmit={submit} className="flex w-full flex-col space-y-6">
        <Field className="flex flex-col" disabled>
          <Label className="text-slate-700">Adresse e-mail</Label>
          <Input
            required
            readOnly
            type="email"
            value={email}
            className="rounded border p-4 text-slate-500 transition data-[disabled]:cursor-not-allowed data-[focus]:border-slate-100 data-[disabled]:bg-slate-50 data-[disabled]:text-slate-400 data-[focus]:outline-none"
          />
        </Field>

        <Field className="flex flex-col">
          <Label className="text-slate-700">Mot de passe</Label>
          <Input
            required
            type="password"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
            className={clsx(
              'rounded border p-4 text-slate-500 transition data-[focus]:outline-none',
              form.errors.password
                ? 'border-red-300 bg-red-50 data-[focus]:border-red-300'
                : 'border-slate-300 bg-slate-100 data-[focus]:border-amber-300 data-[focus]:bg-amber-50'
            )}
          />
          {form.errors.password && (
            <span className="mt-1 flex items-center gap-2 text-sm text-red-500">
              {form.errors.password}
            </span>
          )}
        </Field>

        <Field className="flex flex-col">
          <Label className="text-slate-700">Confirmation mot de passe</Label>
          <Input
            required
            type="password"
            value={form.data.passwordConfirmation}
            onChange={(e) => form.setData('passwordConfirmation', e.target.value)}
            className={clsx(
              'rounded border p-4 text-slate-500 transition data-[focus]:outline-none',
              form.errors.password
                ? 'border-red-300 bg-red-50 data-[focus]:border-red-300'
                : 'border-slate-300 bg-slate-100 data-[focus]:border-amber-300 data-[focus]:bg-amber-50'
            )}
          />
        </Field>

        <Button
          type="submit"
          disabled={form.processing}
          className="flex justify-center rounded border border-amber-500 bg-gradient-to-r from-amber-500 to-amber-300 p-4 text-lg font-medium text-white transition data-[disabled]:cursor-not-allowed data-[hover]:opacity-90"
        >
          {form.processing ? <Spinner text="Modification" /> : 'Modifier mot de passe'}
        </Button>
      </form>
    </>
  )
}

export default ResetPassword
