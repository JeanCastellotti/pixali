import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Field, Input, Label } from '@headlessui/react'
import Spinner from '~/components/spinner'
import clsx from 'clsx'

function Register() {
  const form = useForm({
    username: '',
    email: '',
    password: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    form.post('/register', {
      onError: () => {
        form.reset('password')
      },
    })
  }

  return (
    <>
      <Head title="Créer un compte" />

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-medium text-slate-700">Créer un compte</h1>
        <span className="text-slate-500">
          ou{' '}
          <Link href="/login" className="text-amber-500 hover:underline">
            se connecter
          </Link>
        </span>
      </div>

      <form onSubmit={submit} className="flex w-full flex-col space-y-6">
        <Field className="flex flex-col">
          <Label className="text-slate-700">Nom d'utilisateur</Label>
          <Input
            type="text"
            required
            value={form.data.username}
            onChange={(e) => form.setData('username', e.target.value)}
            className={clsx(
              'rounded border p-4 text-slate-500 transition data-[focus]:outline-none',
              form.errors.username
                ? 'border-red-300 bg-red-50 data-[focus]:border-red-300'
                : 'border-slate-300 bg-slate-100 data-[focus]:border-amber-300 data-[focus]:bg-amber-50'
            )}
          />
          {form.errors.username && (
            <span className="flex items-center gap-2 text-sm text-red-500">
              {form.errors.username}
            </span>
          )}
        </Field>

        <Field className="flex flex-col">
          <Label className="text-slate-700">Adresse e-mail</Label>
          <Input
            type="email"
            required
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
            className={clsx(
              'rounded border p-4 text-slate-500 transition data-[focus]:outline-none',
              form.errors.email
                ? 'border-red-300 bg-red-50 data-[focus]:border-red-300'
                : 'border-slate-300 bg-slate-100 data-[focus]:border-amber-300 data-[focus]:bg-amber-50'
            )}
          />
          {form.errors.email && (
            <span className="flex items-center gap-2 text-sm text-red-500">
              {form.errors.email}
            </span>
          )}
        </Field>

        <Field className="flex flex-col">
          <Label className="text-slate-700">Mot de passe</Label>
          <Input
            type="password"
            required
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
            <span className="flex items-center gap-2 text-sm text-red-500">
              {form.errors.password}
            </span>
          )}
        </Field>

        <Button
          type="submit"
          disabled={form.processing}
          className="flex justify-center rounded border border-amber-500 bg-gradient-to-r from-amber-500 to-amber-300 p-4 text-lg font-medium text-white transition data-[disabled]:cursor-not-allowed data-[hover]:opacity-90"
        >
          {form.processing ? <Spinner text="Création" /> : 'Créer un compte'}
        </Button>
      </form>
    </>
  )
}

export default Register
