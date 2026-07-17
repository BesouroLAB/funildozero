/**
 * Map compartilhado de componentes disponíveis dentro dos arquivos MDX.
 * Usado pelos 3 templates (ArticleTemplate, ArticleTemplateFunil,
 * ArticleTemplateComparativo) — um único lugar para registrar componente novo.
 *
 * Escada de proeminência (design system): CTAGo > ComparativoBox >
 * TutorialBox > EscolhaSeuCaminho/LeiaTambem > callouts.
 */
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { CTAGo } from "@/components/conversion/CTAGo";
import { ComparativoBox } from "@/components/conversion/ComparativoBox";
import { TutorialBox } from "@/components/conversion/TutorialBox";
import { EscolhaSeuCaminho } from "@/components/conversion/EscolhaSeuCaminho";
import { TabelaPrecos } from "@/components/conversion/TabelaPrecos";
import { LeiaTambem } from "@/components/conversion/LeiaTambem";
import { CicloVicioso } from "@/components/conversion/CicloVicioso";
import { TabelaComparativa } from "@/components/conversion/TabelaComparativa";
import { RegulacaoBox } from "@/components/mdx/RegulacaoBox";
import { FunnelDiagram } from "@/components/mdx/FunnelDiagram";
import { PricingComparison } from "@/components/mdx/PricingComparison";
import { VideoEmbed } from "@/components/mdx/VideoEmbed";

export const mdxComponents = {
  // Conversão (design system novo)
  AffiliateCTA,
  CTAGo,
  ComparativoBox,
  TutorialBox,
  EscolhaSeuCaminho,
  TabelaPrecos,
  LeiaTambem,
  CicloVicioso,
  // Legado / editoriais existentes
  TabelaComparativa,
  RegulacaoBox,
  FunnelDiagram,
  PricingComparison,
  VideoEmbed,
};
