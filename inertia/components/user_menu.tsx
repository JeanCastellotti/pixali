import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'

function UserMenu() {
  const { user } = usePage().props

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link
          href="/login"
          className="rounded bg-slate-200 px-2.5 py-1.5 text-sm text-slate-800 transition hover:opacity-80"
        >
          Se connecter
        </Link>
        <Link
          href="/register"
          className="rounded bg-amber-500 px-2.5 py-1.5 text-sm text-white transition hover:opacity-80"
        >
          Créer un compte
        </Link>
      </div>
    )
  }

  return (
    <Menu>
      <MenuButton className="flex items-center gap-2 rounded-md px-2 py-1.5 data-[hover]:bg-slate-100 data-[open]:bg-slate-200">
        <img
          // @ts-expect-error
          src={`https://avatar.iran.liara.run/username?username=${user.username}`}
          className="mr-2 size-8 rounded-full object-cover"
        />
        {/* @ts-expect-error */}
        <span className="text-sm text-slate-800">{user.username}</span>
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
              href=""
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
                <div className=" flex aspect-square size-5 items-center justify-center rounded-full bg-amber-500 text-xs text-amber-50">
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
