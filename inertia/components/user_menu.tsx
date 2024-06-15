import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'
import Avatar from './avatar'

function UserMenu() {
  const { authenticated } = usePage<SharedProps>().props

  if (!authenticated) {
    return (
      <div className="flex gap-2">
        <Link
          href="/login"
          className="rounded bg-slate-200 px-2.5 py-1.5 text-sm text-slate-700 transition hover:opacity-90"
        >
          Se connecter
        </Link>
        <Link
          href="/register"
          className="rounded bg-slate-700 px-2.5 py-1.5 text-sm text-white transition hover:opacity-90"
        >
          Créer un compte
        </Link>
      </div>
    )
  }

  return (
    <Menu>
      <MenuButton className="relative flex items-center gap-2 rounded-md px-2 py-1.5 data-[hover]:bg-slate-100 data-[open]:bg-slate-200">
        <div className="relative">
          {authenticated.avatar ? (
            <img src={authenticated.avatar} className="mr-2 size-8 rounded-full object-cover" />
          ) : (
            <Avatar username={authenticated.username} className="mr-2 size-8 text-sm" />
          )}
          <div className="absolute -top-0.5 right-1 flex size-3">
            <div className="absolute size-full rounded-full bg-amber-500 opacity-75"></div>
            <div className="relative size-3 rounded-full border-2 border-white bg-red-500"></div>
          </div>
        </div>
        <span className="text-sm text-slate-800">{authenticated.username}</span>
        <Icon icon="heroicons:chevron-down-16-solid" className="size-4 text-slate-800" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="z-50 mt-1 flex w-52 origin-top-right flex-col rounded-md border border-slate-200 bg-white p-1 text-sm/6 shadow"
        >
          <MenuItem>
            <Link
              href="/account/profile"
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Icon icon="heroicons:user-16-solid" className="size-4 text-slate-800" />
              <span>Profil</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Icon icon="heroicons:document-text-16-solid" className="size-4 text-slate-800" />
              <span>Articles</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Icon icon="heroicons:star-16-solid" className="size-4 text-slate-800" />
              <span>Tests</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Icon
                icon="heroicons:chat-bubble-left-right-16-solid"
                className="size-4 text-slate-800"
              />
              <span>Discussions</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Icon icon="heroicons:inbox-16-solid" className="size-4 text-slate-800" />
              <div className="flex items-center gap-2">
                <span>Messages</span>
                <div className="flex aspect-square size-5 items-center justify-center rounded-full bg-amber-500 text-xs text-amber-50">
                  20
                  {/* <EllipsisHorizontalIcon className="size-4 text-amber-50" /> */}
                </div>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/logout"
              as="button"
              method="post"
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-red-500 transition hover:bg-red-50"
            >
              <Icon
                icon="heroicons:arrow-right-start-on-rectangle-16-solid"
                className="size-4 text-red-500"
              />
              <span>Se déconnecter</span>
            </Link>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default UserMenu
