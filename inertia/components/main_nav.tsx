import MainNavItem from './main_nav_item'

function MainNav() {
  return (
    <nav className="flex items-center gap-6 text-sm text-slate-500">
      <MainNavItem href="/">Accueil</MainNavItem>
      <MainNavItem href="/threads">Discussions</MainNavItem>
      <MainNavItem href="/posts">Articles</MainNavItem>
      <MainNavItem href="/reviews">Tests</MainNavItem>
    </nav>
  )
}

export default MainNav
