import { Button, Field, Input, Label } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Head, useForm } from '@inertiajs/react'
import clsx from 'clsx'
import Show from '~/helpers/show'

function ForgotPassword() {
  const form = useForm({
    email: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (form.processing) return

    form.post('/forgot-password', {
      onSuccess() {
        form.reset()
      },
    })
  }

  return (
    <>
      <Head title="Mot de passe oublié" />

      <h1 className="mb-6 text-4xl font-medium text-slate-700">Mot de passe oublié</h1>

      <form onSubmit={submit} className="flex w-full flex-col space-y-6" autoComplete="off">
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
          <Show when={!!form.errors.email}>
            <span className="mt-1 flex items-center gap-2 text-sm text-red-500">
              {form.errors.email}
            </span>
          </Show>
        </Field>

        <Button
          type="submit"
          disabled={form.processing}
          className="flex justify-center rounded bg-slate-700 p-4 text-lg/6 text-white transition data-[disabled]:cursor-not-allowed data-[hover]:opacity-90"
        >
          <Show when={form.processing} fallback="Réinitialiser mot de passe">
            <div className="size-6">
              <Icon icon="gg:spinner-two" className="size-6 animate-spin" />
            </div>
          </Show>
        </Button>
      </form>
    </>
  )
}

export default ForgotPassword
