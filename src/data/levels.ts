export interface MineClass {
  name: string;
  zone: string;
  region: string;
  era: string;
  mineral: string;
  title: string;
  scene: string;
  lon: number;
  lat: number;
  blurb: string;
  pinLeft: string;
  pinTop: string;
}

export interface LevelInfo {
  level: number;
  hold: number;
  perDay: number;
  speed: number;
  classIndex: number;
  className: string;
  name: string;
  stars: number;
  zone: string;
  region: string;
  title: string;
  crew: number;
  scene: string;
}

export const CONFIG = {
  MAX_LEVEL: 1000,
  TOKEN_PRICE_USD: null as number | null,
  TOTAL_SUPPLY: 1_000_000_000,
  LEVEL2_HOLD: 100,
  MAX_HOLD: 10_000_000,
  BASE_PER_DAY: 5,
  YIELD_START: 0.05,
  YIELD_END: 0.0005,
  THS_DIVISOR: 25,
};

export const CLASSES: MineClass[] = [
  { name: 'Ngwenya', zone: 'Ngwenya Mine', region: 'Eswatini, Africa', era: 'c. 43,000 BC', mineral: 'Red ochre', title: 'Ochre Digger', scene: 'meadow', lon: 31.1, lat: -26.2, blurb: 'The oldest known mine on Earth. Early people dug red ochre here for paint and ritual.', pinLeft: '57.457%', pinTop: '73.467%' },
  { name: 'Grimes Graves', zone: 'Grimes Graves', region: 'Norfolk, Britain', era: 'c. 2600 BC', mineral: 'Flint', title: 'Flint Knapper', scene: 'tunnel', lon: 0.7, lat: 52.5, blurb: 'Hundreds of Neolithic shafts sunk through chalk with antler picks to reach black flint.', pinLeft: '48.771%', pinTop: '21.000%' },
  { name: 'Rio Tinto', zone: 'Rio Tinto', region: 'Andalusia, Iberia', era: 'c. 3000 BC', mineral: 'Copper & silver', title: 'Copper Smelter', scene: 'canyon', lon: -6.6, lat: 37.7, blurb: 'Red hills and a red river, worked by Iberians, Phoenicians and Romans for copper and silver.', pinLeft: '46.686%', pinTop: '30.867%' },
  { name: 'Isle Royale', zone: 'Isle Royale', region: 'Lake Superior, America', era: 'c. 3000 BC', mineral: 'Native copper', title: 'Copper Hunter', scene: 'creek', lon: -88.9, lat: 48.0, blurb: 'The Old Copper peoples hammered pure copper from lakeside pits thousands of years ago.', pinLeft: '23.171%', pinTop: '24.000%' },
  { name: 'Wadi Maghara', zone: 'Wadi Maghara', region: 'Sinai, Egypt', era: 'c. 2600 BC', mineral: 'Turquoise', title: 'Turquoise Cutter', scene: 'gems', lon: 33.4, lat: 29.0, blurb: "Pharaohs sent expeditions here for turquoise, the 'stone of the sky'.", pinLeft: '58.114%', pinTop: '36.667%' },
  { name: 'Altai', zone: 'Altai Gold Fields', region: 'Siberia, Asia', era: 'c. 500 BC', mineral: 'Gold', title: 'Scythian Goldsmith', scene: 'frost', lon: 87.0, lat: 50.0, blurb: 'Scythian horsemen mined and worked gold in the frozen Altai mountains.', pinLeft: '73.429%', pinTop: '22.667%' },
  { name: 'Laurion', zone: 'Laurion Mines', region: 'Attica, Greece', era: 'c. 480 BC', mineral: 'Silver', title: 'Silver Master', scene: 'forge', lon: 24.05, lat: 37.7, blurb: "Athens' silver mines. Their wealth built the fleet that won at Salamis.", pinLeft: '55.443%', pinTop: '30.867%' },
  { name: 'Kolar', zone: 'Kolar Gold Fields', region: 'Karnataka, India', era: 'c. 200 AD', mineral: 'Gold', title: 'Temple Priest', scene: 'crystal', lon: 78.3, lat: 12.95, blurb: 'Some of the deepest ancient gold workings in the world, mined since early times.', pinLeft: '70.943%', pinTop: '47.367%' },
  { name: 'Tonglüshan', zone: 'Tonglüshan', region: 'Hubei, China', era: 'c. 1000 BC', mineral: 'Copper', title: 'Bronze King', scene: 'magma', lon: 114.9, lat: 30.1, blurb: "Copper for the Zhou dynasty's bronzes came from this hill of shafts and furnaces.", pinLeft: '81.400%', pinTop: '35.933%' },
  { name: 'Ophir', zone: 'Mahd adh Dhahab', region: 'Hejaz, Arabia', era: 'c. 950 BC', mineral: 'Gold', title: 'Emperor of Ophir', scene: 'ancient', lon: 40.86, lat: 23.5, blurb: "The 'Cradle of Gold', thought by many to be the legendary Ophir of King Solomon.", pinLeft: '60.246%', pinTop: '40.333%' },
];

export const MINE_CARDS_DATA = [
  { no: '01', name: 'Ngwenya Mine', meta: 'Eswatini, Africa · c. 43,000 BC', blurb: 'The oldest known mine on Earth. Early people dug red ochre here for paint and ritual.', levels: '1–100', mined: 'Red ochre', rank: 'Ochre Digger', entry: '0 PXE', bg: '/assets/mines/meadow.webp', miner: '/assets/miners/meadow.webp' },
  { no: '02', name: 'Grimes Graves', meta: 'Norfolk, Britain · c. 2600 BC', blurb: 'Hundreds of Neolithic shafts sunk through chalk with antler picks to reach black flint.', levels: '101–200', mined: 'Flint', rank: 'Flint Knapper', entry: '313 PXE', bg: '/assets/mines/tunnel.webp', miner: '/assets/miners/tunnel.webp' },
  { no: '03', name: 'Rio Tinto', meta: 'Andalusia, Iberia · c. 3000 BC', blurb: 'Red hills and a red river, worked by Iberians, Phoenicians and Romans for copper and silver.', levels: '201–300', mined: 'Copper & silver', rank: 'Copper Smelter', entry: '993 PXE', bg: '/assets/mines/canyon.webp', miner: '/assets/miners/canyon.webp' },
  { no: '04', name: 'Isle Royale', meta: 'Lake Superior, America · c. 3000 BC', blurb: 'The Old Copper peoples hammered pure copper from lakeside pits thousands of years ago.', levels: '301–400', mined: 'Native copper', rank: 'Copper Hunter', entry: '3,150 PXE', bg: '/assets/mines/creek.webp', miner: '/assets/miners/creek.webp' },
  { no: '05', name: 'Wadi Maghara', meta: 'Sinai, Egypt · c. 2600 BC', blurb: "Pharaohs sent expeditions here for turquoise, the 'stone of the sky'.", levels: '401–500', mined: 'Turquoise', rank: 'Turquoise Cutter', entry: '9,980 PXE', bg: '/assets/mines/gems.webp', miner: '/assets/miners/gems.webp' },
  { no: '06', name: 'Altai Gold Fields', meta: 'Siberia, Asia · c. 500 BC', blurb: 'Scythian horsemen mined and worked gold in the frozen Altai mountains.', levels: '501–600', mined: 'Gold', rank: 'Scythian Goldsmith', entry: '31,600 PXE', bg: '/assets/mines/frost.webp', miner: '/assets/miners/frost.webp' },
  { no: '07', name: 'Laurion Mines', meta: 'Attica, Greece · c. 480 BC', blurb: "Athens' silver mines. Their wealth built the fleet that won at Salamis.", levels: '601–700', mined: 'Silver', rank: 'Silver Master', entry: '100,000 PXE', bg: '/assets/mines/forge.webp', miner: '/assets/miners/forge.webp' },
  { no: '08', name: 'Kolar Gold Fields', meta: 'Karnataka, India · c. 200 AD', blurb: 'Some of the deepest ancient gold workings in the world, mined since early times.', levels: '701–800', mined: 'Gold', rank: 'Temple Priest', entry: '318,000 PXE', bg: '/assets/mines/crystal.webp', miner: '/assets/miners/crystal.webp' },
  { no: '09', name: 'Tonglüshan', meta: 'Hubei, China · c. 1000 BC', blurb: "Copper for the Zhou dynasty's bronzes came from this hill of shafts and furnaces.", levels: '801–900', mined: 'Copper', rank: 'Bronze King', entry: '1.01M PXE', bg: '/assets/mines/magma.webp', miner: '/assets/miners/magma.webp' },
  { no: '10', name: 'Mahd adh Dhahab', meta: 'Hejaz, Arabia · c. 950 BC', blurb: "The 'Cradle of Gold', thought by many to be the legendary Ophir of King Solomon.", levels: '901–1000', mined: 'Gold', rank: 'Emperor of Ophir', entry: '3.19M PXE', bg: '/assets/mines/ancient.webp', miner: '/assets/miners/ancient.webp' },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function nice(n: number): number {
  if (n < 1000) return Math.round(n);
  const mag = Math.pow(10, Math.floor(Math.log10(n)) - 2);
  return Math.round(n / mag) * mag;
}

const N = CONFIG.MAX_LEVEL;
const growth = Math.pow(CONFIG.MAX_HOLD / CONFIG.LEVEL2_HOLD, 1 / (N - 2));
const yieldStep = Math.pow(CONFIG.YIELD_END / CONFIG.YIELD_START, 1 / (N - 2));

export const TABLE: LevelInfo[] = [];

for (let L = 1; L <= N; L++) {
  let hold: number, perDay: number;
  if (L === 1) {
    hold = 0;
    perDay = CONFIG.BASE_PER_DAY;
  } else {
    const raw = CONFIG.LEVEL2_HOLD * Math.pow(growth, L - 2);
    hold = L === N ? CONFIG.MAX_HOLD : nice(raw);
    const y = CONFIG.YIELD_START * Math.pow(yieldStep, L - 2);
    perDay = Math.max(CONFIG.BASE_PER_DAY, raw * y);
    perDay = perDay < 100 ? Math.round(perDay * 100) / 100 : nice(perDay);
  }
  if (TABLE.length && hold <= TABLE[TABLE.length - 1].hold) hold = TABLE[TABLE.length - 1].hold + 1;
  if (TABLE.length && perDay < TABLE[TABLE.length - 1].perDay) perDay = TABLE[TABLE.length - 1].perDay;

  const ci = Math.floor((L - 1) / 100);
  const inClass = (L - 1) % 100;
  const cls = CLASSES[ci];

  TABLE.push({
    level: L,
    hold,
    perDay,
    speed: Math.round((perDay / CONFIG.THS_DIVISOR) * 100) / 100,
    classIndex: ci,
    className: cls.name,
    name: cls.name + ' ' + ROMAN[Math.floor(inClass / 10)],
    stars: Math.floor(inClass / 20) + 1,
    zone: cls.zone,
    region: cls.region,
    title: cls.title,
    crew: 1 + ci * 5 + Math.floor(inClass / 20),
    scene: cls.scene,
  });
}

export function levelFor(tokens: number): LevelInfo {
  let lo = 0, hi = TABLE.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (TABLE[mid].hold <= tokens) lo = mid; else hi = mid - 1;
  }
  return TABLE[lo];
}

export const getLevel = (L: number): LevelInfo => TABLE[Math.min(Math.max(L, 1), N) - 1];

export function formatNumber(v: number): string {
  const a = Math.abs(v);
  if (a >= 1e9) return (v / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
  if (a >= 1e6) return (v / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (a >= 1000) return Math.round(v).toLocaleString('en-US');
  return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

