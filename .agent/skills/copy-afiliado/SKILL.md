---
name: copy-afiliado
description: Frameworks de copywriting para blog de afiliado. Headlines, CTAs, estrutura de reviews, comparativos e artigos de conversão. Regras de posicionamento de links de afiliado, construção de confiança e persuasão ética. Use SEMPRE que estiver escrevendo, revisando ou estruturando artigos do blog Funil do Zero.
---

# Diretrizes de Copywriting (Funil do Zero)

Esta skill orienta o tom de voz e as estruturas persuasivas que qualquer agente de IA deve usar ao escrever o conteúdo do blog Funil do Zero. Nós não somos um blog institucional chato; somos um blog de marketing, persuasivo e focado em resultado.

## 🎙️ 1. Tom de Voz e Persona
- **Estilo:** Direto, prático, didático, "sem papas na língua". Como um consultor de marketing sênior dando um conselho honesto a um amigo.
- **Foco na Ação:** Menos teoria ("o que é"), mais prática ("como fazer", "por que você está perdendo dinheiro", "como parar de pagar taxas").
- **Honestidade:** Se a Systeme.io tem um defeito (ex: editor de páginas não é tão robusto quanto o Elementor), **fale isso abertamente**. Essa honestidade constrói a confiança necessária para vender nos outros 90% do artigo.

## 🎣 2. O "Gancho Systeme.io"
Todo artigo educativo deve ter uma ponte lógica (o "gancho") para a venda da Systeme.io.
- **Exemplo Errado:** "E-mail marketing é importante. Compre a Systeme.io."
- **Exemplo Correto (O Gancho):** "A teoria do e-mail marketing é linda, mas na prática a maioria das pessoas desiste porque as ferramentas cobram em dólar assim que sua lista passa de 500 contatos. É por isso que recomendamos que você comece com a Systeme.io, que libera 2.000 contatos de graça, para sempre, sem pedir cartão de crédito."

## ⚔️ 3. Dores da Concorrência (Os nossos Alvos)
Em artigos comparativos (Silo 2), **bata implacavelmente nestas dores**:
- **Contra Hotmart/Eduzz/Kiwify:** Taxas transacionais altas (eles mordem até 10% de cada venda). A Systeme cobra **ZERO%** em todos os planos.
- **Contra Clickfunnels/ActiveCampaign:** Preço em dólar, planos iniciais caríssimos. O plano gratuito da Systeme já faz o que o plano de $97 do Clickfunnels faz.
- **Contra "Frankensteins" (WordPress + Plugins):** A dor de cabeça técnica, plugins conflitando, sites lentos, hospedagem cara. A Systeme é *All-in-One*.

## 🖱️ 4. Estrutura de CTAs (Call to Action)
Nunca espere o final do artigo para colocar o link.
1. **CTA Topo (Acima da dobra):** Sutil, contextual. Ex: "Quer pular a teoria? [Crie sua conta grátis na Systeme e copie este funil]."
2. **CTA Meio (Contextual):** Quando falar de um problema, apresente o link como a solução (O Gancho).
3. **CTA Fundo (Hard Pitch):** Resumo dos benefícios (Plano grátis vitalício, suporte < 2h, zero taxas) com um botão grande.

## ✍️ 5. Headlines (Títulos)
Devem sempre focar na dor, no benefício ou na economia de tempo/dinheiro.
- "Alternativa Gratuita à [Ferramenta]"
- "Como Criar um Funil de Vendas para [Profissão] (Sem Pagar Mensalidades)"
- "Systeme.io vs [Ferramenta]: Por Que Você Está Perdendo Dinheiro"

## 🔖 6. Convenção de CTAs (implementação)
Não escreva `<a href>` na mão. Use o componente **`<AffiliateCTA />`** (`src/components/conversion/AffiliateCTA.tsx`) com:
- **`variante`**: `"topo"` (sutil, acima da dobra), `"meio"` (o gancho contextual) ou `"fundo"` (hard-pitch).
- **`refId`**: identifica a origem do clique no GA4. Padrão: **`<silo>-<contexto>-<posição>`**.
  - Silo 1 (funil por profissão): `s1-funil-<slug>-topo` (ex: `s1-funil-dentista-fundo`).
  - Silo 2 (comparativos): `s2-vs-<slug>-meio` (ex: `s2-vs-hotmart-topo`).
  - Ferramentas/lead magnets: nome próprio (ex: `calc-taxa-de-guru`).

Lembre-se: todo link de saída DEVE ser `/go/systeme` (via `goSysteme(ref)` ou `<AffiliateCTA>`). Nunca o link bruto.
