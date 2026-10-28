/* Pickaxe Empire website: links from config.js, menu, reveals, mines carousel + map, animated crew, level calculator. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const SITE = window.SITE || {};
  const L = window.Levels;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- links: every [data-link] takes its URL from config.js, or disappears when it is empty ----
  for (const a of $$('[data-link]')) {
    const v = SITE[a.dataset.link];
    if (!v) { (a.closest('li') || a).hidden = true; continue; }
    a.href = a.dataset.link === 'email' ? `mailto:${v}` : v;
  }
  for (const col of $$('.footer-cols > div')) if (!$$('li', col).some((li) => !li.hidden)) col.hidden = true;
  const socials = $('#socials');
  if (socials && !$$('.social', socials).some((a) => !a.hidden)) socials.hidden = true;
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // ---- token contract ----
  if (SITE.jettonMaster && $('#tokenLive')) {
    $('#tokenSoon').hidden = true;
    $('#tokenLive').hidden = false;
    $('#tokenAddr').textContent = SITE.jettonMaster;
    $('#tokenView').href = `https://tonviewer.com/${encodeURIComponent(SITE.jettonMaster)}`;
    $('#copyAddr').addEventListener('click', async (e) => {
      const b = e.currentTarget, label = b.lastChild.textContent;
      try { await navigator.clipboard.writeText(SITE.jettonMaster); b.lastChild.textContent = 'Copied'; } catch { b.lastChild.textContent = 'Select to copy'; }
      setTimeout(() => { b.lastChild.textContent = label; }, 1600);
    });
  }

  // ---- header + mobile menu ----
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('solid', window.scrollY > 10 || document.body.classList.contains('menu-open'));
  // phones: the "Play" pill appears once the hero's buttons have scrolled away
  const mbar = $('#mbar'), heroCta = $('.hero-actions');
  if (mbar && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => mbar.classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroCta);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const menuBtn = $('.menu-btn');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
    onScroll();
  };
  if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('#drawer a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // ---- reveal on scroll ----
  const revealed = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    revealed.forEach((el) => io.observe(el));
  } else revealed.forEach((el) => el.classList.add('in'));

  // ---- scenes: slow parallax on the art, embers rising from the forge ----
  const layers = $$('[data-parallax]');
  if (layers.length && !reduced) {
    let ticking = false;
    const move = () => {
      ticking = false;
      const vh = innerHeight;
      for (const el of layers) {
        const box = el.parentElement.getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) continue;
        el.style.transform = `translate3d(0, ${((box.top + box.height / 2 - vh / 2) * -Number(el.dataset.parallax)).toFixed(1)}px, 0)`;
      }
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
    addEventListener('resize', move);
    move();
  }
  if (!reduced) {
    for (const box of $$('.embers')) {
      const count = innerWidth < 640 ? 14 : 26;
      box.innerHTML = Array.from({ length: count }, () => {
        const r = Math.random;
        return `<i style="left:${(r() * 100).toFixed(1)}%;--s:${(2 + r() * 3).toFixed(1)}px;--d:${(7 + r() * 8).toFixed(1)}s;--dl:${(-r() * 14).toFixed(1)}s;--x:${Math.round(r() * 120 - 60)}px"></i>`;
      }).join('');
    }
  }

  // ---- mines: horizontal scene track, arrows, progress, map pins follow the slide in view ----
  const list = $('#mineList');
  if (list) {
    const cards = $$('.mine-slide', list), pins = $$('.pin');
    const bar = $('#trackBar'), count = $('#trackCount');
    const pad = (v) => String(v).padStart(2, '0');
    const step = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : list.clientWidth);
    $$('[data-scroll]').forEach((b) => b.addEventListener('click', () => list.scrollBy({ left: step() * Number(b.dataset.scroll), behavior: reduced ? 'auto' : 'smooth' })));
    // where the track rests with this slide snapped: centred on phones, left-aligned on wide screens
    const rest = (c) => (getComputedStyle(c).scrollSnapAlign.includes('start') ? c.offsetLeft - cards[0].offsetLeft : c.offsetLeft - (list.clientWidth - c.clientWidth) / 2);
    pins.forEach((p) => p.addEventListener('click', () => {
      const c = cards[Number(p.dataset.mine)];
      if (c) list.scrollTo({ left: rest(c), behavior: reduced ? 'auto' : 'smooth' });
    }));
    const mark = () => {
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => { const d = Math.abs(rest(c) - list.scrollLeft); if (d < bestD) { bestD = d; best = i; } });
      if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 4) best = cards.length - 1;
      pins.forEach((p, i) => p.classList.toggle('on', i === best));
      cards.forEach((c, i) => c.classList.toggle('on', i === best));
      if (bar) bar.style.width = `${((best + 1) / cards.length) * 100}%`;
      if (count) count.textContent = `${pad(best + 1)} / ${pad(cards.length)}`;
    };
    let t = 0;
    list.addEventListener('scroll', () => { cancelAnimationFrame(t); t = requestAnimationFrame(mark); }, { passive: true });
    mark();
  }

  // ---- crew: miners from four mines digging (sprite sheets) ----
  const row = $('#crewRow');
  if (row) {
    fetch('assets/miners/sprites.json').then((r) => r.json()).then((sp) => {
      const pick = ['meadow', 'canyon', 'frost', 'crystal', 'creek'].filter((k) => sp[k] && sp[k].mine);
      row.innerHTML = pick.map((k) => {
        const m = sp[k].mine;
        return `<span class="sprite" role="img" aria-label="Miner at work" style="--frames:${m.frames};--fw:${m.w};--fh:${m.h};--fps:${m.fps};background-image:url(assets/miners/${k}-mine.webp)"></span>`;
      }).join('');
    }).catch(() => {});
  }

  // ---- level calculator (the game's own level table) ----
  const calc = $('#calc');
  if (calc && L) {
    const MAX = L.CONFIG.MAX_HOLD;
    const fmt = (v) => {
      const a = Math.abs(v);
      if (a >= 1e9) return (v / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
      if (a >= 1e6) return (v / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
      if (a >= 1000) return Math.round(v).toLocaleString('en-US');
      return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
    };
    const input = $('#calcHold'), range = $('#calcRange');
    const toRange = (h) => Math.round((Math.log10(h + 1) / Math.log10(MAX + 1)) * 1000);
    const fromRange = (s) => Math.round(10 ** ((s / 1000) * Math.log10(MAX + 1)) - 1);
    const parse = (s) => { const v = Number(String(s).replace(/[^\d.]/g, '')); return Number.isFinite(v) ? Math.min(v, MAX * 10) : 0; };
    function show(hold, from) {
      const r = L.levelFor(Math.floor(hold)), next = r.level < L.CONFIG.MAX_LEVEL ? L.get(r.level + 1) : null;
      $('#calcLevel').textContent = r.level.toLocaleString('en-US');
      $('#calcSite').textContent = `${r.name} · ${r.title}`;
      $('#calcDay').textContent = fmt(r.perDay);
      $('#calcMonth').textContent = fmt(r.perDay * 30);
      $('#calcCrew').textContent = r.crew;
      $('#calcSpeed').textContent = `${fmt(r.speed)} TH/s`;
      $('#calcNext').textContent = next ? fmt(next.hold) : 'Max level';
      const img = $('#calcScene'); const src = `assets/mines/${r.scene}.webp`;
      if (!img.src.endsWith(src)) img.src = src;
      if (from !== 'range') range.value = toRange(hold);
      if (from !== 'input') input.value = fmt(hold);
      $$('.presets button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.hold) === Math.floor(hold))));
    }
    input.addEventListener('input', () => show(parse(input.value), 'input'));
    input.addEventListener('blur', () => show(parse(input.value)));
    range.addEventListener('input', () => show(fromRange(Number(range.value)), 'range'));
    $$('.presets button').forEach((b) => b.addEventListener('click', () => show(Number(b.dataset.hold))));
    show(parse(input.value));
  }
})();
