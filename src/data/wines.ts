export type WineProduct = {
  id: string;
  slug: string;
  image?: string;
  name: string;
  varietal: string;
  cats: string[];
  tag: string;
  star: boolean;
  /** Resumo curto para o card do catálogo (a ficha completa usa `rows`) */
  cardRows: [string, string][];
  rows: [string, string][];
  /** Frase de destaque do catálogo (só na ficha completa, abaixo da variedade) */
  headline?: string;
  elaboration?: string;
  tastingNotes?: string;
  pairing?: string;
  awards?: string;
};

export function winePublicImageSrc(fileName: string): string {
  const trimmed = fileName.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${encodeURIComponent(trimmed)}`;
}

/** Nome do país na ficha (coluna País) → código ISO 3166-1 alpha-2 para bandeira */
const WINE_COUNTRY_NAME_TO_ISO: Record<string, string> = {
  Argentina: 'ar',
  Portugal: 'pt',
};

/** Origem do vinho a partir da ficha técnica — usado p.ex. para bandeira no card */
export function wineCountryFromRows(wine: WineProduct): { iso: string; name: string } | null {
  const row = wine.rows.find(([k]) => k === 'País');
  if (!row) return null;
  const name = row[1].trim();
  const iso = WINE_COUNTRY_NAME_TO_ISO[name];
  if (!iso) return null;
  return { iso, name };
}

export function wineFlagImageSrc(iso: string, width = 40): string {
  const code = iso.toLowerCase();
  return `https://flagcdn.com/w${width}/${code}.png`;
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
    name: 'Potre White Blend',
    varietal: 'Branco · Meio seco · White blend',
    cats: ['branco', 'blend'],
    tag: 'Branco',
    star: false,
    cardRows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Região', 'Vale Central — Mendoza'],
      ['Uvas', 'Chardonnay, Sauvignon Blanc, Chenin blanc'],
      ['Apresentação', 'Meio seco'],
    ],
    headline:
      'Excelente opção para serviço em taça e cartas de vinho que buscam rótulos leves, aromáticos e versáteis.',
    rows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Apresentação', 'Meio seco'],
      ['Uvas', 'Chardonnay, Sauvignon Blanc e Chenin blanc'],
      ['Região', 'Vale Central — Mendoza'],
      ['País', 'Argentina'],
      ['Volume', '750 ml'],
      ['Estilo', 'Branco leve, aromático e refrescante'],
      ['Temperatura de serviço', '8 – 10 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Fermentação em tanques de aço inoxidável com controle de temperatura, preservando os aromas primários das uvas e mantendo o frescor do vinho.',
    tastingNotes:
      'De coloração amarelo-palha brilhante. No nariz apresenta aromas de frutas cítricas e tropicais, como lima, abacaxi e pêssego, combinados com delicadas notas florais. Em boca é leve, fresco e equilibrado, com acidez agradável e final refrescante.',
    pairing:
      'Saladas frescas, peixes grelhados, frutos do mar, ceviche, sushi e pratos leves da culinária mediterrânea.',
  },
  {
    id: '2',
    slug: 'potre-rose',
    image: 'Potre Rosé - Suave.png',
    name: 'Potre Rosé',
    varietal: 'Rosé · Suave · Blend',
    cats: ['rose', 'blend'],
    tag: 'Rosé',
    star: false,
    cardRows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Região', 'Vale Central — Mendoza'],
      ['Uvas', 'Pedro Giménez, Ugni blanc, Tempranillo'],
      ['Apresentação', 'Suave'],
    ],
    headline:
      'Rosé versátil e moderno, excelente para consumo descontraído e serviço em taça.',
    rows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Apresentação', 'Suave'],
      ['Uvas', 'Pedro Giménez, Ugni blanc e Tempranillo'],
      ['Região', 'Vale Central — Mendoza'],
      ['País', 'Argentina'],
      ['Volume', '750 ml'],
      ['Estilo', 'Rosé fresco, suave, levemente adocicado, frutado e fácil de beber'],
      ['Temperatura de serviço', '8 – 10 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Elaborado por prensagem suave das uvas, com fermentação em tanques de aço inoxidável em temperatura controlada, preservando frescor e expressão aromática.',
    tastingNotes:
      'Apresenta coloração rosé delicada e brilhante. No nariz revela aromas de morango fresco, framboesa e sutis notas florais. Em boca é leve, refrescante e equilibrado, com boa acidez e final frutado.',
    pairing:
      'Entradas leves, saladas, carpaccio, frutos do mar, sushi, culinária mediterrânea e pratos leves à base de aves.',
  },
  {
    id: '3',
    slug: 'potre-malbec',
    image: 'Potre Malbec.png',
    name: 'Potre Malbec',
    varietal: 'Tinto · 100% Malbec',
    cats: ['tinto'],
    tag: 'Tinto',
    star: true,
    cardRows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Região', 'Vale Central — Mendoza'],
      ['Castas', '100% Malbec'],
      ['Safra', '2023'],
    ],
    headline:
      'Malbec versátil e muito gastronômico, excelente opção para cartas de vinho e serviço em taça.',
    rows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Uvas', '100% Malbec'],
      ['Região', 'Vale Central — Mendoza'],
      ['País', 'Argentina'],
      ['Safra', '2023'],
      ['Volume', '750 ml'],
      ['Estilo', 'Tinto de médio corpo, frutado e macio'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    awards:
      'Safra 2023: medalha de ouro — Gilbert & Gaillard International Challenge 2023.',
    elaboration:
      'Fermentação em tanques de aço inoxidável com controle de temperatura, preservando a expressão frutada característica da variedade.',
    tastingNotes:
      'Apresenta coloração rubi profunda. No nariz revela aromas intensos de ameixa madura, cereja negra e delicadas notas florais. Em boca é equilibrado, com taninos macios, boa estrutura e final persistente.',
    pairing:
      'Carnes grelhadas, empanadas argentinas, massas com ragù, risotos e queijos curados.',
  },
  {
    id: '4',
    slug: 'potre-cabernet-sauvignon',
    image: 'Potre Cabernet Sauvignon.png',
    name: 'Potre Cabernet Sauvignon',
    varietal: 'Tinto · 100% Cabernet Sauvignon',
    cats: ['tinto'],
    tag: 'Tinto',
    star: true,
    cardRows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Região', 'Vale Central — Mendoza'],
      ['Castas', '100% Cabernet Sauvignon'],
      ['Safra', '2023'],
    ],
    headline:
      'Excelente vinho para o dia a dia e ótima opção para restaurantes que buscam tintos versáteis e de fácil aceitação.',
    rows: [
      ['Linha', 'Potre · Sunshine Edition'],
      ['Uvas', '100% Cabernet Sauvignon'],
      ['Região', 'Vale Central — Mendoza'],
      ['País', 'Argentina'],
      ['Safra', '2023'],
      ['Volume', '750 ml'],
      ['Estilo', 'Tinto jovem, frutado e fácil de beber'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    awards:
      'Safra 2023: medalha de ouro duplo — Gilbert & Gaillard International Challenge 2023.',
    elaboration:
      'Fermentação em tanques de aço inoxidável com controle de temperatura, buscando preservar a pureza da fruta e a suavidade dos taninos.',
    tastingNotes:
      'De coloração rubi intensa. No nariz apresenta aromas de frutas vermelhas maduras, como cereja e ameixa, acompanhadas por leves notas de especiarias e pirazina. Em boca é equilibrado, macio e agradável, com taninos suaves e final frutado.',
    pairing:
      'Massas com molho de tomate, pizzas, carnes grelhadas, hambúrguer artesanal e queijos semiduros.',
  },
  {
    id: '5',
    slug: 'malbec-reserva',
    image: 'Potre Malbec Reserva.png',
    name: 'Potre Malbec Reserva',
    varietal: 'Tinto · Reserva · 100% Malbec',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    cardRows: [
      ['Linha', 'Potre Reserva'],
      ['Região', 'Vale Central — Mendoza'],
      ['Castas', '100% Malbec'],
      ['Safra', '2020'],
    ],
    headline:
      'Rótulo ideal para cartas de vinho que buscam um Malbec mais estruturado e gastronômico com um bom custo-benefício.',
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Uvas', '100% Malbec'],
      ['Região', 'Vale Central — Mendoza'],
      ['País', 'Argentina'],
      ['Safra', '2020'],
      ['Volume', '750 ml'],
      ['Barrica', '8 meses em carvalho francês'],
      ['Estilo', 'Tinto macio, encorpado e estruturado'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    awards:
      'Safra 2020: medalha de ouro — Gilbert & Gaillard International Challenge 2022 (safra 2020).',
    elaboration:
      'Colheita manual, desengace e maceração a frio, prensagem e fermentação com temperatura controlada em tanques de inox com leveduras selecionadas, fermentação malolática natural. Estágio por 8 meses em barricas de carvalho francês de segundo uso, agregando complexidade aromática e maior estrutura. Filtração e fracionamento.',
    tastingNotes:
      'De coloração rubi intensa. No nariz apresenta aromas de frutas negras maduras, como ameixa e amora, combinados com notas de chocolate, especiarias e sutis toques de baunilha provenientes da passagem por barrica. Em boca é estruturado, elegante e com taninos bem integrados.',
    pairing:
      'Carnes assadas, cordeiro, pratos com molhos intensos, massas com ragù e queijos maturados.',
  },
  {
    id: '6',
    slug: 'cabernet-franc-reserva',
    image: 'Potre Cabernet Franc Reserva.png',
    name: 'Potre Cabernet Franc Reserva',
    varietal: 'Tinto · Reserva · 100% Cabernet Franc',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    cardRows: [
      ['Linha', 'Potre Reserva'],
      ['Região', 'Vale do Uco — Mendoza'],
      ['Castas', '100% Cabernet Franc'],
      ['Estágio', '8 meses em carvalho francês'],
    ],
    headline:
      'Cabernet Franc elegante e versátil, excelente para cartas de vinho que buscam rótulos diferenciados e gastronômicos.',
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Uvas', '100% Cabernet Franc'],
      ['Região', 'Vale do Uco — Mendoza'],
      ['País', 'Argentina'],
      ['Volume', '750 ml'],
      ['Barrica', '8 meses em carvalho francês'],
      ['Estilo', 'Tinto elegante, estruturado e gastronômico'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Colheita manual, seleção de cachos e bagas, desengace, maceração pré-fermentativa a frio, fermentação com temperatura controlada, remontagens e delestage, fermentação malolática. Estágio por 8 meses em barricas de carvalho francês, agregando complexidade aromática e maior estrutura. Estabilização e engarrafamento.',
    tastingNotes:
      'Apresenta coloração rubi intensa. No nariz revela aromas de frutas vermelhas maduras, como framboesa e cereja, combinados com notas de pimenta, eucalipto e especiarias, com leve toque tostado. Em boca é elegante, equilibrado e com taninos macios, boa estrutura e final persistente.',
    pairing:
      'Carnes assadas, cordeiro, pratos com cogumelos, massas com ragù e queijos maturados.',
  },
  {
    id: '7',
    slug: 'cabernet-sauvignon-reserva',
    image: 'Potre Cabernet Sauvignon Reserva.png',
    name: 'Potre Cabernet Sauvignon Reserva',
    varietal: 'Tinto · Reserva · 100% Cabernet Sauvignon',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    cardRows: [
      ['Linha', 'Potre Reserva'],
      ['Região', 'Barrancas, Maipú — Mendoza'],
      ['Castas', '100% Cabernet Sauvignon'],
      ['Estágio', 'Barrica americana + garrafa'],
    ],
    headline:
      'Excelente escolha para cartas de vinho que buscam um Cabernet Sauvignon intenso e gastronômico.',
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Uvas', '100% Cabernet Sauvignon'],
      ['Região', 'Barrancas, Maipú — Mendoza'],
      ['País', 'Argentina'],
      ['Volume', '750 ml'],
      ['Envelhecimento', '30% do blend: 8 meses em carvalho americano; 6 meses em garrafa'],
      ['Estilo', 'Tinto estruturado e encorpado'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      '30% da mistura é envelhecida em barris de carvalho americano por 8 meses. Armazenado em garrafa por mais 6 meses. Vinificação com fermentação em inox, temperatura controlada, extração por bombeios, delestage e pisagem, blend, estabilização e filtração.',
    tastingNotes:
      'Apresenta coloração rubi profunda. No nariz revela aromas intensos de frutas negras maduras, como ameixa, acompanhados por notas de especiarias, pimenta-preta e sutis toques de chocolate e baunilha provenientes do carvalho. Em boca é estruturado, com taninos firmes e bem integrados, final longo e elegante.',
    pairing:
      'Carnes grelhadas, churrasco, cordeiro, massas com ragù e queijos curados.',
  },
  {
    id: '8',
    slug: 'chardonnay-reserva',
    image: 'Potre Chardonnay Reserva.png',
    name: 'Potre Chardonnay Reserva',
    varietal: 'Branco · Reserva · 100% Chardonnay',
    cats: ['branco', 'reserva'],
    tag: 'Reserva',
    star: true,
    cardRows: [
      ['Linha', 'Potre Reserva'],
      ['Região', 'Maipú — Mendoza'],
      ['Castas', '100% Chardonnay'],
      ['Estágio', 'Carvalho francês + garrafa'],
    ],
    headline:
      'Excelente opção para restaurantes que buscam um Chardonnay mais estruturado e gastronômico para compor cartas de vinho.',
    rows: [
      ['Linha', 'Potre Reserva'],
      ['Uvas', '100% Chardonnay'],
      ['Região', 'Maipú — Mendoza'],
      ['País', 'Argentina'],
      ['Volume', '750 ml'],
      ['Envelhecimento', '30% do blend: 4 meses em contacto com carvalho francês; 4 meses em garrafa'],
      ['Estilo', 'Branco estruturado, elegante e gastronômico'],
      ['Temperatura de serviço', '10 – 12 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      '30% da mistura em contato com carvalho francês por um período de 4 meses. Armazenado em garrafa por mais 4 meses. Fermentação em tanques de inox com leveduras selecionadas e temperatura controlada, estabilização e filtração.',
    tastingNotes:
      'De coloração amarelo-palha com reflexos dourados. No nariz apresenta aromas elegantes de frutas tropicais maduras, como abacaxi e manga, combinados com notas de pêssego, baunilha e sutis toques tostados provenientes da passagem por carvalho francês. Em boca é estruturado, cremoso e equilibrado, com boa acidez e final persistente.',
    pairing:
      'Peixes grelhados, frutos do mar, massas com molho branco, risotos cremosos, aves assadas e pratos com cogumelos.',
  },
  {
    id: '9',
    slug: 'pato-criollo-red-blend',
    image: 'Pato Criollo Red Blend - Meio Seco.png',
    name: 'Pato Criollo Red Blend',
    varietal: 'Tinto · Meio seco · Blend',
    cats: ['blend', 'tinto'],
    tag: 'Blend',
    star: false,
    cardRows: [
      ['Linha', 'Pato Criollo'],
      ['Região', 'Primeira Zona — Mendoza'],
      ['Corte', 'Bonarda, Malbec, Cabernet Sauvignon'],
      ['Safra', '2025'],
    ],
    headline:
      'Rótulo de excelente giro, ideal para consumo casual e cartas de vinho acessíveis.',
    rows: [
      ['Linha', 'Pato Criollo · Edición Especial'],
      ['Apresentação', 'Meio seco'],
      ['Uvas', 'Bonarda, Malbec e Cabernet Sauvignon'],
      ['Região', 'Primeira Zona — Mendoza'],
      ['País', 'Argentina'],
      ['Safra', '2025'],
      ['Teor alcoólico', '12,5%'],
      ['Volume', '750 ml'],
      ['Estilo', 'Tinto leve a médio corpo, frutado e acessível'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Colheita manual das uvas, seguida de fermentação em tanques de aço inoxidável com controle de temperatura e leveduras selecionadas, preservando frescor e expressão aromática.',
    tastingNotes:
      'De coloração vermelho-rubi brilhante. No nariz apresenta aromas de frutas vermelhas maduras com leve toque de especiarias. Em boca é macio, equilibrado e fácil de beber, com taninos suaves e final agradável.',
    pairing: 'Massas ao molho vermelho, carnes grelhadas, lasanhas e tábuas de queijos.',
  },
  {
    id: '10',
    slug: 'pato-criollo-white-blend',
    image: 'Pato Criollo White Blend - Meio Seco.png',
    name: 'Pato Criollo White Blend',
    varietal: 'Branco · Meio seco · Blend',
    cats: ['blend', 'branco'],
    tag: 'Blend',
    star: false,
    cardRows: [
      ['Linha', 'Pato Criollo'],
      ['Região', 'Primeira Zona — Mendoza'],
      ['Corte', 'Torrontés, Sauvignon Blanc, Chenin blanc'],
      ['Safra', '2025'],
    ],
    headline:
      'Vinho extremamente versátil e moderno, ideal para serviço em taça com alta aceitação do público.',
    rows: [
      ['Linha', 'Pato Criollo · Edición Especial'],
      ['Apresentação', 'Meio seco'],
      ['Uvas', 'Torrontés, Sauvignon Blanc e Chenin blanc'],
      ['Região', 'Primeira Zona — Mendoza'],
      ['País', 'Argentina'],
      ['Safra', '2025'],
      ['Teor alcoólico', '12%'],
      ['Volume', '750 ml'],
      ['Estilo', 'Branco leve, aromático e refrescante'],
      ['Temperatura de serviço', '8 – 10 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Colheita manual das uvas, seguida de fermentação em tanques de aço inoxidável com controle de temperatura e leveduras selecionadas, preservando frescor e expressão aromática.',
    tastingNotes:
      'Apresenta coloração amarelo-esverdeada brilhante. No nariz revela notas florais delicadas combinadas com aromas de frutas frescas e cítricas. Em boca é leve, elegante e refrescante, com acidez vibrante e final persistente.',
    pairing: 'Saladas com frutas, ceviche, frutos do mar, queijos frescos e pratos leves.',
  },
  {
    id: '11',
    slug: 'dons-da-terra-tinto',
    image: 'Dons da Terra Tinto – Meio Seco.png',
    name: 'Dons da Terra Tinto',
    varietal: 'Tinto · Meio seco',
    cats: ['tinto'],
    tag: 'Tinto',
    star: false,
    cardRows: [
      ['Linha', 'Dons da Terra'],
      ['Região', 'Redondo — Alentejo'],
      ['Uvas', 'Castelão, Trincadeira, Aragonez'],
      ['Colheita', '2024'],
    ],
    headline:
      'Vinho de excelente aceitação, ideal para consumo casual e ótima opção para giro em restaurante.',
    rows: [
      ['Linha', 'Dons da Terra'],
      ['Apresentação', 'Meio seco'],
      ['Classificação', 'Vinho Regional Alentejano'],
      ['Uvas', 'Castelão, Trincadeira e Aragonez'],
      ['Região', 'Redondo — Alentejo'],
      ['País', 'Portugal'],
      ['Colheita', '2024'],
      ['Volume', '750 ml'],
      ['Teor alcoólico', '13,5%'],
      ['Produtor', 'Adega de Redondo'],
      ['Solos', 'Principalmente graníticos; argilo-calcários e xisto'],
      ['Estilo', 'Tinto jovem, macio e frutado'],
      ['Temperatura de serviço', '16 – 18 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Colheita manual das uvas, seguida de fermentação em tanques de aço inoxidável com controle de temperatura e leveduras selecionadas, preservando frescor e expressão aromática.',
    tastingNotes:
      'De coloração rubi intensa. No nariz apresenta aromas de frutos silvestres e frutas vermelhas maduras. Em boca é macio, equilibrado e envolvente, com taninos redondos, boa estrutura e final persistente.',
    pairing:
      'Massas com molho de tomate, carnes grelhadas, pizzas e queijos semiduros.',
  },
  {
    id: '12',
    slug: 'dons-da-terra-rose',
    image: 'Dons da Terra Rosé – Meio Seco.png',
    name: 'Dons da Terra Rosé',
    varietal: 'Rosé · Meio seco',
    cats: ['rose'],
    tag: 'Rosé',
    star: false,
    cardRows: [
      ['Linha', 'Dons da Terra'],
      ['Região', 'Redondo — Alentejo'],
      ['Uvas', 'Aragonez, Castelão'],
      ['Colheita', '2024'],
    ],
    headline:
      'Rosé fácil de agradar, ideal para consumo descontraído e excelente para serviço em taça.',
    rows: [
      ['Linha', 'Dons da Terra'],
      ['Apresentação', 'Meio seco'],
      ['Classificação', 'Vinho Regional Alentejano'],
      ['Uvas', 'Aragonez e Castelão'],
      ['Região', 'Redondo — Alentejo'],
      ['País', 'Portugal'],
      ['Colheita', '2024'],
      ['Volume', '750 ml'],
      ['Teor alcoólico', '12,5%'],
      ['Produtor', 'Adega de Redondo'],
      ['Solos', 'Principalmente graníticos; argilo-calcários e xisto'],
      ['Estilo', 'Rosé leve, fresco e frutado'],
      ['Temperatura de serviço', '8 – 10 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Colheita manual das uvas, maceração pré-fermentativa seguida de fermentação em temperatura controlada, preservando frescor e delicadeza aromática.',
    tastingNotes:
      'Apresenta coloração rosa-claro e brilhante. No nariz revela notas de cereja, nuances de lichia e fruta tropical, leve floral. Em boca é fresco, equilibrado e com agradável persistência.',
    pairing:
      'Saladas, frutos do mar, peixes leves, culinária mediterrânea e pratos leves de verão.',
  },
  {
    id: '13',
    slug: 'dons-da-terra-branco',
    image: 'Dons da Terra White Blend - Seco.png',
    name: 'Dons da Terra White Blend',
    varietal: 'Branco · Seco · Blend',
    cats: ['branco'],
    tag: 'Branco',
    star: false,
    cardRows: [
      ['Linha', 'Dons da Terra'],
      ['Região', 'Redondo — Alentejo'],
      ['Uvas', 'Roupeiro, Fernão Pires, Arinto'],
      ['Colheita', '2024'],
    ],
    headline:
      'Branco versátil e refrescante, excelente opção para consumo diário e alta rotatividade.',
    rows: [
      ['Linha', 'Dons da Terra'],
      ['Apresentação', 'Seco'],
      ['Classificação', 'Vinho Regional Alentejano'],
      ['Uvas', 'Roupeiro, Fernão Pires e Arinto'],
      ['Região', 'Redondo — Alentejo'],
      ['País', 'Portugal'],
      ['Colheita', '2024'],
      ['Volume', '750 ml'],
      ['Teor alcoólico', '12,5%'],
      ['Produtor', 'Adega de Redondo'],
      ['Solos', 'Principalmente graníticos; argilo-calcários e xisto'],
      ['Estilo', 'Branco leve, fresco e aromático'],
      ['Temperatura de serviço', '8 – 10 °C'],
      ['Referência', 'Catálogo 2026'],
    ],
    elaboration:
      'Colheita manual das uvas, seguida de fermentação em tanques de aço inoxidável com controle de temperatura e leveduras selecionadas, preservando frescor e expressão aromática.',
    tastingNotes:
      'De coloração citrina e brilhante. No nariz apresenta aromas intensos de frutas tropicais com nuances cítricas. Em boca é fresco, equilibrado e vibrante, com final harmonioso e persistente.',
    pairing: 'Peixes, frutos do mar, saladas, petiscos e pratos leves.',
  },
];

export function getWineBySlug(slug: string | undefined): WineProduct | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return WINES.find((w) => w.slug === normalized);
}

export function getWineByRouteParam(param: string | undefined): WineProduct | undefined {
  if (!param) return undefined;
  const bySlug = getWineBySlug(param);
  if (bySlug) return bySlug;
  return WINES.find((w) => w.id === param);
}
