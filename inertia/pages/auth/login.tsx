import { Button, Checkbox, Field, Input, Label } from '@headlessui/react'
import { Head, Link, useForm } from '@inertiajs/react'
import clsx from 'clsx'
import Spinner from '~/components/spinner'

function Login() {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (form.processing) return

    form.post('/login', {
      onError: () => {
        form.reset('password')
      },
    })
  }

  return (
    <>
      <Head title="Se connecter" />

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-medium text-slate-700">Se connecter</h1>
        <span className="text-slate-500">
          ou{' '}
          <Link href="/register" className="text-amber-500 hover:underline">
            créer un compte
          </Link>
        </span>
      </div>

      <form onSubmit={submit} className="flex w-full flex-col space-y-6">
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
        </Field>

        <Field className="flex flex-col">
          <div className="flex items-center justify-between">
            <Label className="text-slate-700">Mot de passe</Label>
            <Link href="/forgot-password" className="text-sm text-slate-500 hover:text-amber-500">
              Mot de passe oublié ?
            </Link>
          </div>
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
        </Field>

        <Field className="flex items-center gap-2">
          <Checkbox
            checked={form.data.remember}
            onChange={(checked) => form.setData('remember', checked)}
            className="group block size-4 rounded border border-slate-400 bg-slate-100 data-[checked]:border-amber-600 data-[checked]:bg-amber-500"
          >
            <svg
              className="stroke-white opacity-0 group-data-[checked]:opacity-100"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
          <Label className="text-slate-500">Se souvenir de moi</Label>
        </Field>

        <Button
          type="submit"
          disabled={form.processing}
          className="flex justify-center rounded border border-amber-500 bg-gradient-to-r from-amber-500 to-amber-300 p-4 text-lg font-medium text-white transition data-[disabled]:cursor-not-allowed data-[hover]:opacity-90"
        >
          {form.processing ? <Spinner text="Connexion" /> : 'Se connecter'}
        </Button>
      </form>
    </>
  )
}

export default Login
