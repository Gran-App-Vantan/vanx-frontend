import { Logo } from "./Logo"

export function Header() {
  return (
    <header className="w-full h-28 flex items-center justify-center shadow-bottom">
      <Logo />
    </header>
  )
}