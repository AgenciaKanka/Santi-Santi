export type WineProduct = {
  id: string;
  /** URL amigável, ex.: cabernet-franc-reserva */
  slug: string;
  name: string;
  varietal: string;
  cats: string[];
  tag: string;
  star: boolean;
  rows: [string, string][];
};

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
    slug: 'pero-branco',
    name: 'Pero Branco',
    varietal: 'Branco',
    cats: ['branco'],
    tag: 'Branco',
    star: false,
    rows: [
      ['Região', 'Mendoza'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '2',
    slug: 'pero-rose',
    name: 'Pero Rosé',
    varietal: 'Rosé',
    cats: ['rose'],
    tag: 'Rosé',
    star: false,
    rows: [
      ['Região', 'Mendoza'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '3',
    slug: 'malbec',
    name: 'Malbec',
    varietal: 'Tinto',
    cats: ['tinto'],
    tag: 'Tinto',
    star: false,
    rows: [
      ['Região', 'Luján de Cuyo'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '4',
    slug: 'cabernet-sauvignon',
    name: 'Cabernet Sauvignon',
    varietal: 'Tinto',
    cats: ['tinto'],
    tag: 'Tinto',
    star: false,
    rows: [
      ['Região', 'Valle de Uco'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '5',
    slug: 'malbec-reserva',
    name: 'Malbec Reserva',
    varietal: 'Tinto · Reserva',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Região', 'Alto Valle'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '6',
    slug: 'cabernet-franc-reserva',
    name: 'Cabernet Franc Reserva',
    varietal: 'Tinto · Reserva',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Região', 'Mendoza'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '7',
    slug: 'cabernet-sauvignon-reserva',
    name: 'Cabernet Sauvignon Reserva',
    varietal: 'Tinto · Reserva',
    cats: ['tinto', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Região', 'Valle de Uco'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '8',
    slug: 'chardonnay-reserva',
    name: 'Chardonnay Reserva',
    varietal: 'Branco · Reserva',
    cats: ['branco', 'reserva'],
    tag: 'Reserva',
    star: true,
    rows: [
      ['Região', 'Mendoza'],
      ['Linha', 'PeRo'],
      ['Origem', 'Argentina'],
    ],
  },
  {
    id: '9',
    slug: 'pato-criollo-red-blend',
    name: 'Pato Criollo Red Blend',
    varietal: 'Blend · Tinto',
    cats: ['blend', 'tinto'],
    tag: 'Blend',
    star: false,
    rows: [
      ['Região', 'Mendoza'],
      ['Uvas', 'Malbec, Cab. Sauv., Bonarda'],
      ['Linha', 'Pato Criollo'],
    ],
  },
  {
    id: '10',
    slug: 'pato-criollo-white-blend',
    name: 'Pato Criollo White Blend',
    varietal: 'Blend · Branco',
    cats: ['blend', 'branco'],
    tag: 'Blend',
    star: false,
    rows: [
      ['Região', 'Mendoza'],
      ['Uvas', 'Chardonnay, Torrontés, Viognier'],
      ['Linha', 'Pato Criollo'],
    ],
  },
  {
    id: '11',
    slug: 'dons-da-terra-tinto',
    name: 'Dons da Terra Tinto',
    varietal: 'Tinto',
    cats: ['tinto'],
    tag: 'Tinto',
    star: false,
    rows: [
      ['Região', 'Portugal'],
      ['Uvas', 'Touriga Nacional, Aragonez'],
      ['Linha', 'Dons da Terra'],
    ],
  },
  {
    id: '12',
    slug: 'dons-da-terra-rose',
    name: 'Dons da Terra Rosé',
    varietal: 'Rosé',
    cats: ['rose'],
    tag: 'Rosé',
    star: false,
    rows: [
      ['Região', 'Portugal'],
      ['Uvas', 'Castelão, Touriga Nacional'],
      ['Linha', 'Dons da Terra'],
    ],
  },
  {
    id: '13',
    slug: 'dons-da-terra-branco',
    name: 'Dons da Terra Branco',
    varietal: 'Branco',
    cats: ['branco'],
    tag: 'Branco',
    star: false,
    rows: [
      ['Região', 'Portugal'],
      ['Uvas', 'Fernão Pires, Arinto'],
      ['Linha', 'Dons da Terra'],
    ],
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
