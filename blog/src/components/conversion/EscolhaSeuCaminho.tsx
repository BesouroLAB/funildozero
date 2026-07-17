import Link from "next/link";

interface Caminho {
  titulo: string;
  desc: string;
  href: string;
}

interface EscolhaSeuCaminhoProps {
  titulo?: string;
  opcoes: Caminho[];
}

/**
 * Roteador de persona (ToFu → MoFu/BoFu): em artigos do Silo 4, oferece
 * 2–3 portas para o leitor descer o funil conforme quem ele é.
 */
export function EscolhaSeuCaminho({
  titulo = "Qual é o seu caso?",
  opcoes,
}: EscolhaSeuCaminhoProps) {
  return (
    <section className="fz-router" aria-label={titulo}>
      <h3 className="fz-router__title">{titulo}</h3>
      <div className="fz-router__grid">
        {opcoes.map((o) => (
          <Link key={o.href} className="fz-router__card" href={o.href}>
            <strong>{o.titulo}</strong>
            <span>{o.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
