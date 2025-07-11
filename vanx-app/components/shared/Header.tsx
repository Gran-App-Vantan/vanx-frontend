import { Logo } from "./Logo"

export function Header() {
  return (
    <header className="fixed top-0 bg-white w-full min-w-screen h-24 flex items-center justify-center shadow-bottom z-50">
      <Logo />
    </header>
  )
}