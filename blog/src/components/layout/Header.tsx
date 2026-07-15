import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { href: "/funil-de-vendas", label: "Funil de Vendas" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/systeme-io", label: "Systeme.io" },
  { href: "/calculadora-de-taxas", label: "Calculadora" },
  { href: "/sobre", label: "Sobre" },
];

/** Header global com navegação principal. Mobile-friendly via menu colapsável nativo (details/summary). */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <Image
            src="/icone.png"
            alt="Funil do Zero Ícone"
            width={36}
            height={36}
            className="h-9 w-auto"
            priority
          />
          <span className="font-poppins text-xl font-bold tracking-tight text-[#0B132B] sm:text-2xl">
            Funil do zero
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-5 text-sm sm:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#0B132B]/75 transition-colors hover:text-[#00B2B2]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav — sem JS, usa details/summary nativo */}
        <details className="relative sm:hidden">
          <summary className="cursor-pointer list-none p-2 text-[#0B132B]/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full mt-2 flex min-w-[200px] flex-col gap-1 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-[#0B132B]/80 transition-colors hover:bg-[#F7F9FC] hover:text-[#00B2B2]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
