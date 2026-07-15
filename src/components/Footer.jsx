import { Link, useLocation } from "react-router-dom";

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 8.4s-.22-1.55-.9-2.23c-.85-.9-1.8-.9-2.24-.95C15.9 5 12 5 12 5h-.02s-3.9 0-6.85.22c-.44.05-1.4.05-2.24.95C2.22 6.85 2 8.4 2 8.4S1.78 10.2 1.78 12v1.68c0 1.8.22 3.6.22 3.6s.22 1.55.9 2.23c.85.9 1.96.87 2.46.97C7.2 20.63 12 20.7 12 20.7s3.9-.01 6.85-.23c.44-.05 1.4-.05 2.24-.95.68-.68.9-2.23.9-2.23s.22-1.8.22-3.6V12c0-1.8-.22-3.6-.22-3.6Zm-12.1 6.6V9l5.4 3-5.4 3Z" />
    </svg>
  );
}

function TiktokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-.9-.86-1.42-2.02-1.44-3.32h-3.02v13.55c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-.5-5.4v-3.06a5.74 5.74 0 0 0-1.28-.14c-3.17 0-5.74 2.57-5.74 5.74S4.47 21.65 7.64 21.65s5.74-2.57 5.74-5.74V9.01a8.7 8.7 0 0 0 5.08 1.63V7.62c-.68 0-1.34-.14-1.96-.4a5.68 5.68 0 0 1-1.9-1.4Z" />
    </svg>
  );
}

const featureLinks = [
  { to: "/teknik", label: "Kalkulator Rasio & Jadwal Tuang" },
  { to: "/", label: "Roda Rasa & Kosakata Kopi" },
  { to: "/tools", label: "Rekomendasi Tools Barista" },
];

const infoLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/teknik", label: "Teknik" },
  { to: "/tools", label: "Tools" },
  { to: "/tentang", label: "Tentang Kami" },
];

const socialLinks = [
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "#", label: "YouTube", Icon: YoutubeIcon },
  { href: "#", label: "TikTok", Icon: TiktokIcon },
];

export default function Footer() {
  const { pathname } = useLocation();
  const isTeknik = pathname === "/teknik";

  return (
    <footer className="pt-9 pb-16 border-t border-garis">
      {isTeknik && (
        <p className="text-xs text-tintasoft leading-relaxed max-w-[70ch] mb-8">
          Rasio dan jadwal tuang diadaptasi dari teknik yang telah dipublikasikan secara publik oleh
          masing-masing barista/juara, dipakai di sini sebagai titik awal, bukan aturan mati. Estimasi
          kekuatan pada visualizer bersifat indikatif untuk membantu intuisi rasa, bukan pengukuran TDS/EY
          yang presisi. Sesuaikan selalu dengan biji kopi, alat, dan selera aktual di lapangan.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-roastamber mb-3.5">
            Fitur Brownpage
          </h3>
          <ul className="space-y-2 text-sm text-tintasoft">
            {featureLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-tinta transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-roastamber mb-3.5">
            Info Brownpage
          </h3>
          <ul className="space-y-2 text-sm text-tintasoft">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-tinta transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-roastamber mb-3.5">
            Racik, Seduh, Berbagi!
          </h3>
          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-tinta text-kertas hover:bg-espresso transition-colors"
              >
                <Icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-roastamber mb-3.5">
            Kontak & Informasi
          </h3>
          <div className="border border-tinta w-fit">
            <div className="px-3.5 py-2.5 font-mono text-xs">+62 823 2380 9948</div>
            <div className="px-3.5 py-2.5 bg-tinta text-kertas font-mono text-[11px] uppercase tracking-wide">
              Kontak & Informasi
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-10 pt-6 border-t border-garis">
        <div className="flex items-center gap-4 font-mono text-[11px] text-tintasoft">
          <Link to="/syarat-dan-ketentuan" className="hover:text-tinta transition-colors">
            Syarat dan Ketentuan
          </Link>
          <Link to="/kebijakan-privasi" className="hover:text-tinta transition-colors">
            Kebijakan Privasi
          </Link>
        </div>
        <div className="font-mono text-[11px] text-tintasoft">© Brownpage 2023</div>
      </div>
    </footer>
  );
}
