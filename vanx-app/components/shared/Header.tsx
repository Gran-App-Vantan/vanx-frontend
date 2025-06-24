import { Logo } from "./Logo"

export function Header() {
  return (
    <header 
      className="w-full h-28 flex items-center justify-center"
      style={{
        boxShadow: "0px 2px 5px -2px rgba(0,0,0,0.5)"
      }}
    >
      <Logo />
    </header>
  )
}