"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Escaneia a página procurando H2 e H3 dentro da tag article
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    const headingElements = elements
      .filter((el) => el.id) // Apenas os que têm ID (gerado pelo rehype-slug)
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.nodeName === "H2" ? 2 : 3,
      }));

    setHeadings(headingElements);

    const observer = new IntersectionObserver(
      (entries) => {
        // Encontra o elemento visível que está mais próximo do topo
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } // Gatilho dispara quando o título cruza o topo
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-24 hidden h-fit max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <h3 className="mb-4 font-bold text-[#0B132B]">Neste artigo</h3>
      <nav className="flex flex-col space-y-2 border-l-2 border-gray-100">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block truncate pl-4 text-sm transition-colors hover:text-[#00B2B2] ${
              activeId === h.id
                ? "border-l-2 -ml-[2px] border-[#00B2B2] font-semibold text-[#00B2B2]"
                : "text-[#0B132B]/60"
            } ${h.level === 3 ? "ml-4" : ""}`}
            title={h.text}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
