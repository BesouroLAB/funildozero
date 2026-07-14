import Link from "next/link";
import { SITE, AFFILIATE_DISCLOSURE } from "@/lib/site";

const LINKS = [
  { href: "/funil-de-vendas", label: "Funil de Vendas" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/calculadora-taxa-de-guru", label: "Calculadora de Taxa" },
  { href: "/sobre", label: "Sobre" },
  { href: "/autor", label: "Autor" },
];

/** Rodapé global. Reforça E-E-A-T (links Sobre/Autor) e traz a divulgação de afiliado em todas as páginas. */
export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#F7F9FC]">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#0B132B]/80 hover:text-[#00B2B2]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-5 text-xs text-[#0B132B]/50">{AFFILIATE_DISCLOSURE}</p>
        <p className="mt-2 text-xs text-[#0B132B]/50">
          © {ano} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
