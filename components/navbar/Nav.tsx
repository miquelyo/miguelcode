import NavHome from "./NavHome"
import NavMenu from "./NavMenu"

export default function Nav() {
  return (
    <nav className="fixed z-[999] h-full w-full"> {/* 🚫 hapus pointer-events-none */}
      <NavHome />
      <NavMenu />
    </nav>
  )
}
