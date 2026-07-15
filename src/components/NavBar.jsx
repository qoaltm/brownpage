import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/kopitaim-logo.png";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/teknik", label: "Teknik" },
  { to: "/tentang", label: "Tentang Kami" },
];

export default function NavBar() {
  return (
    <header className="border-b border-garis sticky top-0 bg-kertas/95 backdrop-blur z-10">
      <div className="max-w-[1180px] mx-auto px-7 py-3.5 flex items-center justify-between gap-6">
        <NavLink to="/" className="shrink-0">
          <img src={logo} alt="Kopitaim" className="h-6 w-auto" />
        </NavLink>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="relative px-3.5 py-2">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-tinta"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${isActive ? "text-kertas" : "text-tintasoft hover:text-tinta"}`}>
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
