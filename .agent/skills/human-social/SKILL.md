---
name: human-social
description: >-
  Desdobramento de conteúdo visual para redes sociais. Pega uma pasta com texto
  + imagens, gera peças nativas pra Instagram Feed, Instagram Stories e
  LinkedIn Feed via GPT Image 2 (gpt_image_2). Cada peça é um desdobramento
  direto da arte-mãe: mesma foto/visual, mesma linguagem de fonte, mesmas
  cores, mesmos elementos gráficos, com adaptação de formato, copy e safe
  zones. Use SEMPRE que o usuário pedir "desdobrar", "adaptar pra redes",
  "criar peças pra Instagram e LinkedIn", "desdobramento de campanha",
  "adaptar pra stories", ou mandar uma arte/campanha e pedir versões para
  múltiplas plataformas.
---

# Desdobramento de Conteúdo Visual para Redes Sociais

Pega uma pasta com texto + imagens, gera peças nativas pra Instagram Feed, Instagram Stories e LinkedIn Feed via **GPT Image 2** (`gpt_image_2`). Cada peça é um **desdobramento direto da arte-mãe**: mesma foto/visual, mesma linguagem de fonte, mesmas cores, mesmos elementos gráficos, com adaptação de formato, copy e safe zones.

Uma skill (`/desdobrar`), zero cerimônia. O usuário é fotógrafo/diretor de arte, **não é técnico** — toda configuração é descoberta e perguntada no fluxo.

---

## Como o usuário usa

```
/desdobrar /caminho/da/pasta
```

A pasta precisa ter:
- 1 arquivo `.txt` com a legenda/briefing original (qualquer nome)
- 1+ imagens (`.png`, `.jpg`, `.jpeg`, `.webp`)

Saída fica em `<pasta>/desdobramento/`:
```
desdobramento/
├── instagram-feed.png             1080×1440, 3:4
├── instagram-feed.txt             legenda IG nativa curta (gancho + CTA)
├── instagram-stories/
│   ├── story-01.png               1080×1920, safe zones respeitadas
│   ├── story-02.png
│   ├── story-03.png
│   └── roteiro.txt                roteiro frame-a-frame + stickers
├── linkedin-feed.png              1920×1080, 16:9
├── linkedin-feed.txt              legenda LinkedIn (substantiva, 1ª pessoa)
├── apresentacao-desdobramento.pdf PDF com base, peças e textos
├── output/                        pasta limpa com os finais para o usuário
└── manifest.json                  mapa técnico do que foi gerado
```

Ao terminar, a pasta mais amigável é `<pasta>/desdobramento/output/`. Informe em link clicável e liste todos os arquivos gerados.

---

## Como cada rede é tratada (desdobramento, não redesign)

| Eixo | IG Feed | IG Stories | LinkedIn Feed |
|---|---|---|---|
| **Consumo** | Polegar rolando, 1-2s | 3-7s vertical mobile | Leitura ativa 30-90s |
| **Viralização** | Save + share + comment | View-through rate | Comentário + reshare |
| **Imagem** | Mesma arte-mãe em 3:4 | 3 variações em 9:16 | Mesma arte-mãe em 16:9 |
| **Iluminação/Paleta** | Preservar a original | Preservar a original | Preservar a original |
| **Copy densidade** | 60-120 palavras | Mínima, 1 ideia/frame | 160-320 palavras |
| **Registro copy** | Oral, rítmico | Telegrama mobile | Editorial, 1ª pessoa |
| **CTA** | Leve ("salva", "comenta") | Micro ("responde aqui") | Pergunta aberta |
| **Hashtag** | 3-7 no final | Não usa | 2-4 no final |

### Escolha da arte-mãe

- Se houver imagem já diagramada com foto + lettering → ela é a arte-mãe
- Se houver várias → escolha a mais próxima de peça final
- Se não houver peça diagramada → escolha a imagem principal e mantenha a linguagem visual

### Regras de geração

- O prompt deve ser **curto**. O GPT Image 2 entende a imagem: diga só o formato destino, o texto exato e o que muda
- Reforce fidelidade aos elementos visíveis da arte-mãe: não remover, não trocar, não inventar objetos
- Use a arte-mãe como referência base para manter consistência
- Geração via MCP ou sandbox da IDE usando **GPT Image 2** (`gpt_image_2`)

### Stories — regras especiais

Stories sempre são **3 frames**. Os três usam a mesma arte-mãe como referência de identidade, mas:
- Não podem ser cópia com texto trocado
- A imagem por trás do texto precisa mudar no trio
- Cada Story tem texto e background/imagem próprios
- Varie crop, ângulo, pose, iluminação, fundo estendido, área sólida
- O trio precisa parecer sequência com ritmo visual
- Sem trocar marca, fonte, paleta ou linguagem

### Trocas pontuais

Se o usuário pedir troca numa peça já criada, use a própria peça como base e peça só a troca — manter tudo igual exceto o elemento pedido.

---

## Fluxo mínimo

1. Validar inputs (texto + imagens na pasta)
2. Analisar visualmente as imagens e escolher uma arte-mãe
3. Criar prompts curtos: formato destino + texto exato + o que preservar
4. Gerar para IG Feed, 3 Stories e LinkedIn usando a mesma arte-mãe como base
5. Nos Stories, pedir variação real de imagem/background/cena entre os 3 frames
6. Escrever todas as copies finais: Instagram Feed, roteiro de Stories e LinkedIn
7. Gerar PDF de apresentação com base, peças e textos
8. Sincronizar `desdobramento/output/` com os arquivos finais
9. Responder com caminhos absolutos dos arquivos finais

---

## Princípios

- **GPT Image 2 sempre.** Todo desdobramento visual usa `gpt_image_2`
- **Desdobramento, não redesign.** A peça nova precisa parecer irmã direta da arte-mãe, não uma campanha nova
- **Prompt mínimo.** O modelo já enxerga a peça; só informe formato, texto exato e ajustes
- **Stories em trio.** Sempre 3, com textos e imagens/backgrounds diferentes
- **Vision nativa real.** Abra cada imagem e decodifique paleta/mood na hora. Sem cache
- **3 copies diferentes do zero.** IG ≠ LinkedIn. Se ficarem parecidas, refaz
- **Entrega final em PDF.** Toda execução concluída gera apresentação com base, peças e textos
- **Output limpo.** Sincronize `desdobramento/output/` com os arquivos finais
- **Stateless.** Cada execução é fresca. Sem state, sem multi-projeto
- **Falha em 1 formato não derruba os outros.** Manifest registra `pronto` ou `parcial`
