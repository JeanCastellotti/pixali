import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  // EllipsisHorizontalIcon,
  InboxIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import { Link } from '@inertiajs/react'

type Props = {
  user: Record<string, any>
}

function UserMenu({ user }: Props) {
  return (
    <Menu>
      <MenuButton className="flex items-center gap-2 rounded-md px-2 py-1.5 data-[hover]:bg-slate-100 data-[open]:bg-slate-200">
        <img
          src={`https://avatar.iran.liara.run/username?username=${user.username}`}
          className="mr-2 size-8 rounded-full object-cover"
        />
        <span className="text-sm text-slate-800">{user.username}</span>
        <ChevronDownIcon className="size-4 fill-slate-500" />
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
              <UserIcon className="size-4 fill-slate-800" />
              <span>Profil</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <DocumentTextIcon className="size-4 fill-slate-800" />
              <span>Articles</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <StarIcon className="size-4 fill-slate-800" />
              <span>Tests</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <ChatBubbleLeftRightIcon className="size-4 fill-slate-800" />
              <span>Discussions</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href=""
              className="flex items-center gap-4 rounded-md px-3 py-1.5 text-slate-500 hover:bg-slate-100"
            >
              <InboxIcon className="size-4 fill-slate-800" />
              <span>Messages</span>
              <div className=" flex aspect-square size-5 items-center justify-center rounded-full bg-amber-500 text-xs text-amber-50">
                20
                {/* <EllipsisHorizontalIcon className="size-4 fill-amber-50" /> */}
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
              <ArrowRightStartOnRectangleIcon className="size-4 fill-red-500" />
              <span>Se déconnecter</span>
            </Link>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default UserMenu
