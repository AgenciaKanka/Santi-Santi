export type WineProduct = {
  id: string;
  /** URL amigável, ex.: cabernet-franc-reserva */
  slug: string;
  /** Nome do ficheiro em `public/` (ex.: Potre Malbec.png) */
  image?: string;
  name: string;
  varietal: string;
  cats: string[];
  tag: string;
  star: boolean;
  rows: [string, string][];
  /** Elaboração / vinificação (texto na ficha completa) */
  elaboration?: string;
  /** Notas de degustação */
  tastingNotes?: string;
  /** Harmonização */
  pairing?: string;
  /** Prêmios ou menções */
  awards?: string;
};

const ELAB_POTRE_BASE =
  'Colheita manual, recepção e desengace, fermentação com temperatura controlada em tanques de inox com leveduras selecionadas, clarificação, blend, filtração e engarrafamento.';

const ELAB_PATO_BASE =
  'Colheita manual, recepção e desengace, fermentação com temperatura controlada em tanques de inox com leveduras selecionadas, clarificação, filtração e engarrafamento.';

const ELAB_DONS_BASE =
  'Colheita manual das uvas, recepção e desengace, fermentação com temperatura controlada em tanques de inox com leveduras selecionadas, clarificação, filtração e fracionamento.';

/** URL para imagem servida a partir de `public/` (respeita `base` do Vite). */
export function winePublicImageSrc(fileName: string): string {
  const trimmed = fileName.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${encodeURIComponent(trimmed)}`;
}

export const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'tinto', label: 'Tintos' },
  { id: 'branco', label: 'Brancos' },
  { id: 'rose', label: 'Rosés' },
  { id: 'blend', label: 'Blends' },
  { id: 'reserva', label: 'Reserva' },
] as const;

export const WINES: WineProduct[] = [
  {
    id: '1',
    slug: 'potre-branco',
    image: 'Potre White Blend - Meio Seco.png',
    name: 'Potre Branco',
    varietal: 'Branco',
    cats: ['branco', 'blend'],
    tag: 'Branco',
    star: false,
    rows: [
      ['Linha', 'Potre'],
      ['Variedade', 'Blend de uvas brancas'],
      ['Vinhedo', 'Vale Central, Mendoza'],
      ['Origem', 'Argentina'],
    ],
    elaboration: ELAB_POTRE_BASE,
    tastingNotes:
      'Límpido e brilhante, com coloração amarelo-esverdeada. Aromas sutis, frescos e frutados. Na boca, entrada suave, corpo médio e final agradável.',
  },
  {
    id: '2',
    slug: 'potre-rose',
    image: 'Potre Rosé - Suave.png',
    name: 'Potre Rosé',
    varietal: 'Rosé',
    cats: ['rose', 'blend'],
    tag: 'Rosé',
    star: false,
    rows: [
      ['Linha', 'Potre'],
      ['Variedade', 'Blend de uvas tintas'],
      ['Vinhedo', 'Vale Central, Mendoza'],
      ['Origem', 'Argentina'],
    ],
    elaboration: ELAB_POTRE_BASE,
    tastingNotes:
      'Coloração rosada com tons brilhantes. Aroma fresco, frutado e harmônico, com boa expressão. Na boca, corpo dócil e retrogosto doce e agradável.',
  },
  {
    id: '3',
    slug: 'potre-malbec',
    image: 'Potre Malbec.png',
    name: 'Potre Malbec',
    varietal: 'Tinto',
    cats: ['tinto', 'blend'],
    tag: 'Tinto',
    star: true,
    rows: [
      ['Linha', 'Potre'],
      ['Variedade', 'Blend de uvas tintas'],
      ['Vinhedo', 'Vale Central, Mendoza'],
      ['Safra', '2023'],
      ['Origem', 'Argentina'],
    ],
    awards: 'Medalha de ouro — Gilbert & Gaillard International Challenge 2023 (safra 2023).',
    elaboration: ELAB_POTRE_BASE,
    tastingNotes:
      'Violeta-tinto intenso. Aromas frutados com presença marcada de cerejas e ameixas. Na boca, entrada agradável, boa estrutura, taninos suaves, muito equilibrado e final longo.',
  },
  {
    id: '4',
    slug: 'potre-cabernet-sauvignon',
    image: 'Potre Cabernet Sauvignon.png',
    name: 'Potre Cabernet Sauvignon',
    varietal: 'Tinto',
    cats: ['tinto', 'blend'],
    tag: 'Tinto',
    star: true,
    rows: [
      ['Linha', 'Potre'],
      ['Variedade', 'Blend de uvas tintas'],
      ['Vinhedo', 'Vale Central, Mendoza'],
      ['Safra', '2023'],
      ['Origem', 'Argentina'],
    ],
    awards:
      'Medalha de ouro duplo — Gilbert & Gaillard International Challenge 2023 (safra 2023).',
    elaboration: ELAB_POTRE_BASE,
    tastingNotes:
      'Rubi brilhante. Aromas de frutas vermelhas e especiarias como pimenta. No paladar, muito equilibrado, com taninos doces e persistentes.',
  },
  {
    id: '5',
    slug: 'malbec-reserva',
    image: 'Potre Malbec Reserva.png',
    name: 'Potre Malbec Reserva',
    varietal: 'Tinto · Reserva',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Variedade', '100% Malbec'],
      ['Vinhedo', 'Vale Central, Mendoza'],
      ['Safra', '2020'],
      ['Origem', 'Argentina'],
    ],
    awards:
      'Medalha de ouro — Gilbert & Gaillard International Challenge 2022 (safra 2020).',
    elaboration:
      'Colheita manual, desengace e maceração a frio, prensagem, fermentação com temperatura controlada em tanques de inox com leveduras selecionadas, fermentação malolática natural, estágio por 8 meses em barricas francesas de segundo uso, filtração e fracionamento.',
    tastingNotes:
      'Violeta com tons azuis intensos. Nariz com combinação de ameixas e morangos e notas de chocolate e baunilha vindas do carvalho. Paladar equilibrado e sedoso, com final persistente.',
  },
  {
    id: '6',
    slug: 'cabernet-franc-reserva',
    image: 'Potre Cabernet Franc Reserva.png',
    name: 'Potre Cabernet Franc Reserva',
    varietal: 'Tinto · Reserva',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Variedade', '100% Cabernet Franc'],
      ['Área', 'Vale do Uco, Mendoza'],
      ['Origem', 'Argentina'],
    ],
    elaboration:
      'Colheita manual, seleção de cachos e bagas, desengace, maceração pré-fermentativa a frio por 3 dias a 5 °C, fermentação por 10 dias com temperatura controlada, remontagens diárias e delestage, fermentação malolática, estágio por 8 meses em barricas francesas de segundo uso, estabilização e engarrafamento.',
    tastingNotes:
      'Vermelho-rubi profundo. Grande intensidade aromática e tipicidade varietal, com notas que lembram pimenta, eucalipto e especiarias. Entrada doce e suave, taninos redondos e maduros.',
  },
  {
    id: '7',
    slug: 'cabernet-sauvignon-reserva',
    image: 'Potre Cabernet Sauvignon Reserva.png',
    name: 'Potre Cabernet Sauvignon Reserva',
    varietal: 'Tinto · Reserva',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Variedade', '100% Cabernet Sauvignon'],
      ['Área', 'Barrancas, Maipú — Mendoza'],
      ['Origem', 'Argentina'],
    ],
    elaboration:
      'Colheita manual em filas, transferência para silos, recepção e desengace, fermentação em tanques de inox com leveduras selecionadas e temperatura controlada, extração alternada com bombeios, delestage e pisagem por 10 a 13 dias, blend, estabilização, filtração e engarrafamento. Envelhecimento: 30% do blend por 8 meses em barricas de carvalho americano; permanência de 6 meses em garrafa.',
    tastingNotes:
      'Granada intenso, rico em aromas frutados com toques de especiarias e chocolate do tempo em carvalho. Paladar equilibrado e untuoso, com final persistente.',
  },
  {
    id: '8',
    slug: 'chardonnay-reserva',
    image: 'Potre Chardonnay Reserva.png',
    name: 'Potre Chardonnay Reserva',
    varietal: 'Branco · Reserva',
    cats: ['branco', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Variedade', '100% Chardonnay'],
      ['Área', 'Maipú — Mendoza'],
      ['Origem', 'Argentina'],
    ],
    elaboration:
      'Colheita manual em filas, transferência para silos, recepção e desengace, fermentação em tanques de inox com leveduras selecionadas e temperatura controlada, estabilização, filtração e engarrafamento. Envelhecimento: 30% do blend em contato com carvalho francês por 4 meses; 4 meses de guarda em garrafa.',
    tastingNotes:
      'Amarelo com reflexos esverdeados. Maçã verde e frutas tropicais em equilíbrio com nota suave de baunilha do carvalho. Doce e untuoso, bem equilibrado pela acidez, com fruta, baunilha e tostado leve e final longo.',
  },
  {
    id: '9',
    slug: 'pato-criollo-red-blend',
    image: 'Pato Criollo Red Blend - Meio Seco.png',
    name: 'Pato Criollo Red Blend',
    varietal: 'Blend · Tinto',
    cats: ['blend', 'tinto'],
    tag: 'Blend',
    star: false,
    rows: [
      ['Linha', 'Pato Criollo'],
      ['Uvas', 'Bonarda, Malbec, Cabernet Sauvignon'],
      ['Origem', 'Mendoza, Argentina'],
      ['Safra', '2025'],
      ['Teor alcoólico', '12,5%'],
    ],
    elaboration: ELAB_PATO_BASE,
    tastingNotes:
      'Rubi brilhante de intensidade média. Nariz sutil e fresco, com frutas vermelhas maduras. Entrada limpa e suave, sabor frutado bem definido e persistência agradável. Perfil equilibrado e acessível.',
    pairing:
      'Massas ao sugo, lasanha, carnes grelhadas ou tábua de queijos semicurados.',
  },
  {
    id: '10',
    slug: 'pato-criollo-white-blend',
    image: 'Pato Criollo White Blend - Meio Seco.png',
    name: 'Pato Criollo White Blend',
    varietal: 'Blend · Branco',
    cats: ['blend', 'branco'],
    tag: 'Blend',
    star: false,
    rows: [
      ['Linha', 'Pato Criollo'],
      ['Uvas', 'Torrontés, Sauvignon Blanc, Chenin Blanc'],
      ['Origem', 'Mendoza, Argentina'],
      ['Safra', '2025'],
      ['Teor alcoólico', '12%'],
    ],
    elaboration: ELAB_PATO_BASE,
    tastingNotes:
      'Amarelo-esverdeado brilhante de intensidade média. Aromas florais delicados e fruta fresca. Boca vibrante, acidez marcante e notas cítricas, com final refrescante e persistente.',
    pairing:
      'Saladas com frutas tropicais, ceviche, moquecas leves ou queijos frescos como minas.',
  },
  {
    id: '11',
    slug: 'dons-da-terra-tinto',
    image: 'Dons da Terra Tinto – Meio Seco.png',
    name: 'Dons da Terra Tinto',
    varietal: 'Tinto',
    cats: ['tinto'],
    tag: 'Tinto',
    star: false,
    rows: [
      ['Linha', 'Dons da Terra'],
      ['Classificação', 'Vinho Regional Alentejano'],
      ['Uvas', 'Castelão, Trincadeira, Aragonez'],
      ['Colheita', '2024'],
      ['Capacidade', '750 ml'],
      ['Teor alcoólico', '13%'],
      ['Produtor', 'Adega de Redondo'],
      ['Solos', 'Principalmente graníticos; argilo-calcários e xisto'],
    ],
    elaboration: ELAB_DONS_BASE,
    tastingNotes:
      'Tinto rubi intenso com a essência do Alentejo. Aromas de frutos silvestres, especiarias e tabaco. Na boca, sabor agradável, taninos macios e boa estrutura, com final persistente.',
    pairing:
      'Versátil e gastronômico: carnes, massas e queijos de intensidade média.',
  },
  {
    id: '12',
    slug: 'dons-da-terra-rose',
    image: 'Dons da Terra Rosé – Meio Seco.png',
    name: 'Dons da Terra Rosé',
    varietal: 'Rosé',
    cats: ['rose'],
    tag: 'Rosé',
    star: false,
    rows: [
      ['Linha', 'Dons da Terra'],
      ['Classificação', 'Vinho Regional Alentejano'],
      ['Uvas', 'Castelão, Aragonez'],
      ['Colheita', '2024'],
      ['Capacidade', '750 ml'],
      ['Teor alcoólico', '12,5%'],
      ['Produtor', 'Adega de Redondo'],
      ['Solos', 'Principalmente graníticos; argilo-calcários e xisto'],
    ],
    elaboration: ELAB_DONS_BASE,
    tastingNotes:
      'Rosé fresco e vibrante, com cor sutil. Aromas delicados de cereja, framboesa e lichia. Paladar marcado pela frescura e persistência, com final agradável.',
    pairing: 'Entradas, frutos do mar e peixes.',
  },
  {
    id: '13',
    slug: 'dons-da-terra-branco',
    image: 'Dons da Terra White Blend - Seco.png',
    name: 'Dons da Terra Branco',
    varietal: 'Branco',
    cats: ['branco'],
    tag: 'Branco',
    star: false,
    rows: [
      ['Linha', 'Dons da Terra'],
      ['Classificação', 'Vinho Regional Alentejano'],
      ['Uvas', 'Roupeiro, Fernão Pires, Arinto'],
      ['Colheita', '2024'],
      ['Capacidade', '750 ml'],
      ['Teor alcoólico', '12,5%'],
      ['Produtor', 'Adega de Redondo'],
      ['Solos', 'Principalmente graníticos; argilo-calcários e xisto'],
    ],
    elaboration: ELAB_DONS_BASE,
    tastingNotes:
      'Refrescante e equilibrado. Amarelo-esverdeado brilhante. Aromas de flores brancas, frutas tropicais, maçã verde intensa e limão. Boca harmoniosa, mineralidade sutil, fresca e cheia de vivacidade.',
    pairing: 'Peixes, frutos do mar e saladas.',
  },
];

export function getWineBySlug(slug: string | undefined): WineProduct | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return WINES.find((w) => w.slug === normalized);
}

/** Compat: URLs antigas só com id numérico ainda resolvem o vinho. */
export function getWineByRouteParam(param: string | undefined): WineProduct | undefined {
  if (!param) return undefined;
  const bySlug = getWineBySlug(param);
  if (bySlug) return bySlug;
  return WINES.find((w) => w.id === param);
}
