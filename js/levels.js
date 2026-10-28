/*
 * Pickaxe Empire — level table (shared by backend and frontend).
 *
 * Rules:
 *  - 1000 levels. Level 1 needs 0 tokens, level 2 needs 100 tokens.
 *  - Level 1000 needs MAX_HOLD = 10,000,000 tokens: 1% of the 1,000,000,000 PXE total supply.
 *  - Between level 2 and 1000 the requirement grows geometrically (same ~1.16% step each level), so each of the
 *    ten mines needs ~3.16x the one before: Lv 201 ≈ 1k, Lv 401 ≈ 10k, Lv 601 = 100k, Lv 801 ≈ 1M, Lv 1000 = 10M.
 *  - Daily yield % falls as levels rise (5%/day at level 2 → 0.05%/day at level 1000),
 *    so big holders earn more coins but a smaller % of what they hold.
 *  - Speed (TH/s) is cosmetic: perDay / 25, the same ratio the reference app shows.
 *  - 10 miner classes × 100 levels. Each class has 10 ranks (I–X, 10 levels each)
 *    and 1–5 stars (one more star every 20 levels).
 *  - Crew = miners working for you: grows with each class and each star (1 at level 1, 50 at level 1000).
 *
 * Change the numbers in CONFIG and both apps pick them up.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Levels = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const CONFIG = {
    MAX_LEVEL: 1000,
    TOKEN_PRICE_USD: null,    // no fixed price: the app shows the live market price the server reports (state.priceUsd)
    TOTAL_SUPPLY: 1_000_000_000,
    LEVEL2_HOLD: 100,         // tokens needed for level 2
    MAX_HOLD: 10_000_000,     // tokens needed for level 1000 (1% of the total supply)
    BASE_PER_DAY: 5,          // what level 1 (holding 0) mines per day
    YIELD_START: 0.05,        // 5%/day of the requirement at level 2
    YIELD_END: 0.0005,        // 0.05%/day at level 1000
    THS_DIVISOR: 25,          // speed = perDay / 25
  };

  // 10 real ancient mining sites, one per 100 levels — the journey on the world map.
  // lon/lat place the pin; scene picks the art and the miners' outfit.
  const CLASSES = [
    { name: 'Ngwenya',        zone: 'Ngwenya Mine',        region: 'Eswatini, Africa',       era: 'c. 43,000 BC', mineral: 'Red ochre',      title: 'Ochre Digger',      scene: 'meadow',  lon: 31.1,  lat: -26.2,
      blurb: 'The oldest known mine on Earth. Early people dug red ochre here for paint and ritual.' },
    { name: 'Grimes Graves',  zone: 'Grimes Graves',       region: 'Norfolk, Britain',       era: 'c. 2600 BC',   mineral: 'Flint',          title: 'Flint Knapper',     scene: 'tunnel',  lon: 0.7,   lat: 52.5,
      blurb: 'Hundreds of Neolithic shafts sunk through chalk with antler picks to reach black flint.' },
    { name: 'Rio Tinto',      zone: 'Rio Tinto',           region: 'Andalusia, Iberia',      era: 'c. 3000 BC',   mineral: 'Copper & silver', title: 'Copper Smelter',   scene: 'canyon',  lon: -6.6,  lat: 37.7,
      blurb: 'Red hills and a red river, worked by Iberians, Phoenicians and Romans for copper and silver.' },
    { name: 'Isle Royale',    zone: 'Isle Royale',         region: 'Lake Superior, America', era: 'c. 3000 BC',   mineral: 'Native copper',  title: 'Copper Hunter',     scene: 'creek',   lon: -88.9, lat: 48.0,
      blurb: 'The Old Copper peoples hammered pure copper from lakeside pits thousands of years ago.' },
    { name: 'Wadi Maghara',   zone: 'Wadi Maghara',        region: 'Sinai, Egypt',           era: 'c. 2600 BC',   mineral: 'Turquoise',      title: 'Turquoise Cutter',  scene: 'gems',    lon: 33.4,  lat: 29.0,
      blurb: "Pharaohs sent expeditions here for turquoise, the 'stone of the sky'." },
    { name: 'Altai',          zone: 'Altai Gold Fields',   region: 'Siberia, Asia',          era: 'c. 500 BC',    mineral: 'Gold',           title: 'Scythian Goldsmith', scene: 'frost',  lon: 87.0,  lat: 50.0,
      blurb: 'Scythian horsemen mined and worked gold in the frozen Altai mountains.' },
    { name: 'Laurion',        zone: 'Laurion Mines',       region: 'Attica, Greece',         era: 'c. 480 BC',    mineral: 'Silver',         title: 'Silver Master',     scene: 'forge',   lon: 24.05, lat: 37.7,
      blurb: "Athens' silver mines. Their wealth built the fleet that won at Salamis." },
    { name: 'Kolar',          zone: 'Kolar Gold Fields',   region: 'Karnataka, India',       era: 'c. 200 AD',    mineral: 'Gold',           title: 'Temple Priest',     scene: 'crystal', lon: 78.3,  lat: 12.95,
      blurb: 'Some of the deepest ancient gold workings in the world, mined since early times.' },
    { name: 'Tonglüshan',     zone: 'Tonglüshan',          region: 'Hubei, China',           era: 'c. 1000 BC',   mineral: 'Copper',         title: 'Bronze King',       scene: 'magma',   lon: 114.9, lat: 30.1,
      blurb: "Copper for the Zhou dynasty's bronzes came from this hill of shafts and furnaces." },
    { name: 'Ophir',          zone: 'Mahd adh Dhahab',     region: 'Hejaz, Arabia',          era: 'c. 950 BC',    mineral: 'Gold',           title: 'Emperor of Ophir',  scene: 'ancient', lon: 40.86, lat: 23.5,
      blurb: "The 'Cradle of Gold', thought by many to be the legendary Ophir of King Solomon." },
  ];

  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  // "Nice" rounding so requirements read like 1,240 or 3.85M instead of 1,237.4412
  function nice(n) {
    if (n < 1000) return Math.round(n);
    const mag = Math.pow(10, Math.floor(Math.log10(n)) - 2); // keep 3 significant digits
    return Math.round(n / mag) * mag;
  }

  const N = CONFIG.MAX_LEVEL;
  const growth = Math.pow(CONFIG.MAX_HOLD / CONFIG.LEVEL2_HOLD, 1 / (N - 2));
  const yieldStep = Math.pow(CONFIG.YIELD_END / CONFIG.YIELD_START, 1 / (N - 2));

  const TABLE = [];
  for (let L = 1; L <= N; L++) {
    let hold, perDay;
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
    // keep requirements strictly increasing after rounding
    if (TABLE.length && hold <= TABLE[TABLE.length - 1].hold) hold = TABLE[TABLE.length - 1].hold + 1;
    if (TABLE.length && perDay < TABLE[TABLE.length - 1].perDay) perDay = TABLE[TABLE.length - 1].perDay;

    const ci = Math.floor((L - 1) / 100);
    const inClass = (L - 1) % 100;            // 0..99
    const cls = CLASSES[ci];
    TABLE.push({
      level: L,
      hold,                                    // whole tokens required
      perDay,                                  // tokens mined per day
      speed: Math.round((perDay / CONFIG.THS_DIVISOR) * 100) / 100, // TH/s
      classIndex: ci,
      className: cls.name,
      name: cls.name + ' ' + ROMAN[Math.floor(inClass / 10)],
      stars: Math.floor(inClass / 20) + 1,
      zone: cls.zone,
      region: cls.region,
      title: cls.title,
      crew: 1 + ci * 5 + Math.floor(inClass / 20), // one more miner every 20 levels: 1 at Lv 1 → 50 at Lv 1000
      scene: cls.scene,
    });
  }

  /** Highest level whose requirement is <= combined holding (whole tokens). */
  function levelFor(tokens) {
    let lo = 0, hi = TABLE.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (TABLE[mid].hold <= tokens) lo = mid; else hi = mid - 1;
    }
    return TABLE[lo];
  }

  const get = (L) => TABLE[Math.min(Math.max(L, 1), N) - 1];
  /** USD value of `tokens` at `price` (USD per token), or null when there is no price. */
  const usd = (tokens, price = CONFIG.TOKEN_PRICE_USD) => (price > 0 ? tokens * price : null);

  return { CONFIG, CLASSES, TABLE, levelFor, get, usd };
});
