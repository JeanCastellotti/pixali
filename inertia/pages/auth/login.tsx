import { Button, Checkbox, Field, Input, Label } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Head, Link, useForm } from '@inertiajs/react'
import clsx from 'clsx'

function Login() {
  const form = useForm({
    email: '',
    password: '',
    remember: true,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (form.processing) return

    form.post('/login', {
      onFinish: () => {
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

      <form onSubmit={submit} className="flex w-full flex-col space-y-6" autoComplete="off">
        <Field className="flex flex-col">
          <Label className="text-slate-700">Adresse e-mail</Label>
          <Input
            required
            type="email"
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
        </Field>

        <Field className="flex items-center gap-2">
          <Checkbox
            checked={form.data.remember}
            onChange={(checked) => form.setData('remember', checked)}
            className="group block rounded border border-slate-300 bg-slate-100"
          >
            <Icon
              icon="heroicons:check-16-solid"
              className="size-4 text-slate-700 opacity-0 group-data-[checked]:opacity-100"
            />
          </Checkbox>
          <Label className="text-sm text-slate-500">Se souvenir de moi</Label>
        </Field>

        <Button
          type="submit"
          disabled={form.processing}
          className="flex justify-center rounded bg-slate-700 p-4 text-lg/6 text-white transition data-[disabled]:cursor-not-allowed data-[hover]:opacity-90"
        >
          {form.processing ? (
            <div className="size-6">
              <Icon icon="gg:spinner-two" className="size-6 animate-spin" />
            </div>
          ) : (
            'Se connecter'
          )}
        </Button>

        <div className="flex items-center gap-5">
          <div className="w-full border-b border-slate-200"></div>
          <span className="font-semibold text-slate-500">ou</span>
          <div className="w-full border-b border-slate-200"></div>
        </div>

        <a
          href="/discord/redirect"
          className="flex items-center justify-center gap-4 rounded bg-[#7289da] p-2.5 text-white transition hover:opacity-90"
        >
          <div className="rounded-full bg-white p-2 transition hover:scale-105">
            <Icon icon="simple-icons:discord" className="size-6 text-[#7289da]" />
          </div>
          <span>Se connecter avec Discord</span>
        </a>
      </form>
    </>
  )
}

export default Login
