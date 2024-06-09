import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import Show from '~/helpers/show'

function Register() {
  const form = useForm({
    username: '',
    email: '',
    password: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (form.processing) return

    form.post('/register', {
      onFinish: () => {
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

      <form onSubmit={submit} className="flex w-full flex-col space-y-6" autoComplete="off">
        <Field className="flex flex-col">
          <Label className="text-slate-700">Nom d'utilisateur</Label>
          <Input
            required
            type="text"
            value={form.data.username}
            onChange={(e) => form.setData('username', e.target.value)}
            className={clsx(
              'rounded border p-4 text-slate-500 transition data-[focus]:outline-none',
              form.errors.username
                ? 'border-red-300 bg-red-50 data-[focus]:border-red-300'
                : 'border-slate-300 bg-slate-100 data-[focus]:border-amber-300 data-[focus]:bg-amber-50'
            )}
          />
          <Show when={!!form.errors.username}>
            <span className="mt-1 flex items-center gap-2 text-sm text-red-500">
              {form.errors.username}
            </span>
          </Show>
        </Field>

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
          <Show when={!!form.errors.email}>
            <span className="mt-1 flex items-center gap-2 text-sm text-red-500">
              {form.errors.email}
            </span>
          </Show>
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
          <Show when={!!form.errors.password}>
            <span className="mt-1 flex items-center gap-2 text-sm text-red-500">
              {form.errors.password}
            </span>
          </Show>
        </Field>

        <Button
          type="submit"
          disabled={form.processing}
          className="flex justify-center rounded bg-slate-700 p-4 text-lg/6 text-white transition data-[disabled]:cursor-not-allowed data-[hover]:opacity-90"
        >
          <Show when={form.processing} fallback="Créer un compte">
            <div className="size-6">
              <Icon icon="gg:spinner-two" className="size-6 animate-spin" />
            </div>
          </Show>
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

export default Register
