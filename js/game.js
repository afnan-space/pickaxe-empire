/*
 * Pickaxe Empire — game settings shared by backend and frontend:
 * referrals, daily check-in, Earn-page tasks and storage boosts.
 * Edit these and both sides pick them up.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Game = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const REFERRAL = {
    SHARE: 0.05,        // inviter gets 5% of everything a friend claims from mining, for life (extra, not taken from the friend).
                        // It collects as "friend rewards" and the inviter claims it by hand (Profile → Friends).
                        // Step 2: paid once the friend has linked a TON wallet AND minted the Ancient Pass into it.
    // Step 3: a friend is "verified" (qualified) after step 2 plus VERIFY_TASKS tasks (friend tasks don't count)
    // and check-ins on VERIFY_CHECKINS days. Only verified friends count for the "Invite verified friends" tasks.
    VERIFY_TASKS: 3,
    VERIFY_CHECKINS: 3,
  };

  /** Step 2: the friend linked a TON wallet and minted the Ancient Pass, so the inviter earns the share. */
  const earnsShare = (f) => !!f.wallet && !!f.pass;

  /** Step 3: true when a friend summary {wallet, pass, tasksDone, checkinDays} meets the verification rules. */
  const isVerified = (f) => earnsShare(f) && f.tasksDone >= REFERRAL.VERIFY_TASKS && f.checkinDays >= REFERRAL.VERIFY_CHECKINS;

  // Daily check-in rewards, day 1..7. Missing a day restarts at day 1. After day 7 it loops.
  const CHECKIN = [3, 5, 7, 9, 11, 13, 15];

  // Storage = how many hours of mining can pile up before the user must claim.
  // Bought with in-app coins; spent coins are burned. A tier costs PRICE_SHARE of everything that storage holds
  // (one full fill) at the buyer's current level: if 36h of mining is 100 coins, the 36h tier costs 30.
  // The price follows the level, so it rises and falls with the player's mining speed (no fixed minimums).
  const STORAGE = [
    { tier: 0, hours: 24 },
    { tier: 1, hours: 36 },
    { tier: 2, hours: 48 },
    { tier: 3, hours: 72 },
    { tier: 4, hours: 96 },
  ];
  const PRICE_SHARE = 0.3;

  /** Extra coins one fill holds with tier t compared with the tier before it, for someone mining `perDay`. */
  const storageGain = (t, perDay) => (t.tier ? (t.hours - STORAGE[t.tier - 1].hours) / 24 * perDay : 0);

  /** Coins one full fill of tier t holds for someone mining `perDay`. */
  const storageFill = (t, perDay) => t.hours / 24 * perDay;

  /** Price in coins of a storage tier for someone mining `perDay` coins a day: PRICE_SHARE of one full fill. */
  function storageCost(t, perDay) {
    const v = t.tier ? storageFill(t, perDay) * PRICE_SHARE : 0;
    if (!v) return 0;
    return v < 10 ? Math.max(0.1, Math.round(v * 10) / 10) : Math.round(v);
  }

  /** Hours of extra mining (beyond the previous tier) after which tier t has paid for itself. */
  const storagePayback = (t, perDay) => (t.tier && perDay ? storageCost(t, perDay) / perDay * 24 : 0);

  // Withdrawals: minimum amount, no maximum. A flat fee is kept from the amount, smaller for bigger withdrawals.
  // FEES are checked top-down: the first row whose `from` the amount reaches sets the fee.
  const WITHDRAW = {
    MIN: 500,
    FEES: [
      { from: 10000, fee: 50 },
      { from: 5000,  fee: 60 },
      { from: 500,   fee: 70 },
    ],
  };
  // Withdrawals by players holding at least this much on-chain are counted as "holders" (admin stats).
  const HOLDER_MIN = 5000;
  /** Fee kept from a withdrawal of `amount` coins. */
  const withdrawFee = (amount) => (WITHDRAW.FEES.find((f) => amount >= f.from) || WITHDRAW.FEES[WITHDRAW.FEES.length - 1]).fee;

  // Earn-page tasks live in the database only: the admin adds, edits, pauses, reorders and deletes every one of them.
  // Kinds:
  //  channel: user must be a member of `chat` (bot must be admin there) — checked with Telegram Bot API
  //  link:    open the link, claim after `wait` seconds
  //  partner: the partner's API is asked on Claim
  //  auto:    unlocks by itself when `need` is met
  //  hold:    repeats every HOLD_EVERY_H hours while the linked wallet holds `need.onchain` tokens on-chain
  // DEFAULT_TASKS is the starting board, written into the database once (backend admin.js seedTasks). After that the
  // admin panel owns the board. A default added later carries `added: N` (N > 1): a server whose board is older inserts
  // it once (DEFAULTS_VERSION), and if the admin deletes it, it stays deleted.
  const HOLD_EVERY_H = 24;
  const DEFAULT_TASKS = [
    { id: 'join_channel', group: 'Community', kind: 'channel', title: 'Join the announcement channel', chat: '@your_channel', url: 'https://t.me/your_channel', reward: 100, icon: 'telegram' },
    { id: 'join_chat',    group: 'Community', kind: 'channel', title: 'Join the miners chat',          chat: '@your_chat',    url: 'https://t.me/your_chat',    reward: 100, icon: 'telegram' },
    { id: 'follow_x',     group: 'Community', kind: 'link',    title: 'Follow us on X',                url: 'https://x.com/your_account', wait: 15, reward: 50, icon: 'xbrand' },
    { id: 'join_discord', group: 'Community', kind: 'link',    title: 'Join our Discord',              url: 'https://discord.gg/your_invite', wait: 15, reward: 50, icon: 'discord' },
    { id: 'share_story',  group: 'Community', kind: 'story',   title: 'Share Pickaxe Empire to your story', caption: 'Mining PXE in Pickaxe Empire ⛏️', wait: 30, repeatHours: 24, reward: 3, icon: 'send', added: 3 },
    { id: 'hold_5k',  group: 'On-chain holders', kind: 'hold', title: 'Hold 5,000 PXE on-chain',  need: { onchain: 5000 },  reward: 10, icon: 'holder' },
    { id: 'hold_10k', group: 'On-chain holders', kind: 'hold', title: 'Hold 10,000 PXE on-chain', need: { onchain: 10000 }, reward: 20, icon: 'holder' },
    { id: 'hold_30k', group: 'On-chain holders', kind: 'hold', title: 'Hold 30,000 PXE on-chain', need: { onchain: 30000 }, reward: 30, icon: 'holder' },
    { id: 'hold_50k', group: 'On-chain holders', kind: 'hold', title: 'Hold 50,000 PXE on-chain', need: { onchain: 50000 }, reward: 50, icon: 'holder' },
    { id: 'first_claim',  group: 'Getting started', kind: 'auto', title: 'Claim your first mining',   need: { claims: 1 },  reward: 20,  icon: 'pick' },
    { id: 'link_wallet',  group: 'Getting started', kind: 'auto', title: 'Connect a TON wallet',      need: { wallet: 1 },  reward: 100, icon: 'wallet' },
    { id: 'mint_pass',    group: 'Getting started', kind: 'auto', title: 'Mint your Ancient Pass',    need: { pass: 1 },    reward: 10,  icon: 'crown', added: 2 },
    { id: 'reach_10',     group: 'Getting started', kind: 'auto', title: 'Reach level 10',            need: { level: 10 },  reward: 50,  icon: 'up' },
    { id: 'invite_v1', group: 'Friends', kind: 'auto', title: 'Invite 1 verified friend', need: { verified: 1 }, reward: 50, icon: 'friends' },
    { id: 'invite_v5', group: 'Friends', kind: 'auto', title: 'Invite 5 verified friends', need: { verified: 5 }, reward: 200, icon: 'friends' },
    { id: 'invite_v10', group: 'Friends', kind: 'auto', title: 'Invite 10 verified friends', need: { verified: 10 }, reward: 250, icon: 'friends' },
    { id: 'invite_v20', group: 'Friends', kind: 'auto', title: 'Invite 20 verified friends', need: { verified: 20 }, reward: 500, icon: 'friends' },
    { id: 'invite_v30', group: 'Friends', kind: 'auto', title: 'Invite 30 verified friends', need: { verified: 30 }, reward: 500, icon: 'friends' },
    { id: 'invite_v50', group: 'Friends', kind: 'auto', title: 'Invite 50 verified friends', need: { verified: 50 }, reward: 1000, icon: 'friends' },
    { id: 'invite_v100', group: 'Friends', kind: 'auto', title: 'Invite 100 verified friends', need: { verified: 100 }, reward: 2500, icon: 'friends' },
    { id: 'invite_v250', group: 'Friends', kind: 'auto', title: 'Invite 250 verified friends', need: { verified: 250 }, reward: 7500, icon: 'friends' },
    { id: 'invite_v500', group: 'Friends', kind: 'auto', title: 'Invite 500 verified friends', need: { verified: 500 }, reward: 12500, icon: 'friends' },
    { id: 'invite_v1000', group: 'Friends', kind: 'auto', title: 'Invite 1,000 verified friends', need: { verified: 1000 }, reward: 25000, icon: 'friends' },
  ];

  // ---- the task board (database rows) ----
  // A row is a whole task {id, kind, group, title, reward, ..., order, hidden}. allTasks gives the admin's view,
  // mergeTasks the players' (paused ones left out). Kinds: link, channel, partner, auto (unlocks when `need` is met:
  // wallet / level / verified friends / claims) and hold (on-chain balance, repeats). Every task may have a description,
  // a completion limit (maxCompletions: first N players) and repeatHours (claim again that long after the last claim;
  // hold tasks default to HOLD_EVERY_H). EDIT lists the fields the admin sets for each kind. Any task can be limited to
  // an audience: geoMode/langMode 'all' | 'only' | 'except' the listed ISO country codes (geo) / language codes (lang).
  const DEFAULTS_VERSION = Math.max(1, ...DEFAULT_TASKS.map((t) => t.added || 1));
  // story: opens Telegram's story editor with the caption (always ending in @bot #PXE $PXE) and the player's tracked
  // story link; claim after `wait` seconds. Telegram doesn't let bots read stories, so opens of that link are the proof.
  const KINDS = ['link', 'channel', 'partner', 'auto', 'hold', 'story'];
  // auto goals: wallet linked, Ancient Pass minted (pass), level, verified friends, mining claims
  const NEEDS = { auto: ['wallet', 'pass', 'level', 'verified', 'claims'], hold: ['onchain'] };
  const COMMON = ['title', 'reward', 'description', 'maxCompletions', 'repeatHours', 'order', 'icon'];
  const EDIT = { link: [...COMMON, 'url', 'wait'], channel: [...COMMON, 'url', 'chat'], partner: [...COMMON, 'url'], auto: COMMON, hold: [...COMMON, 'url'], story: [...COMMON, 'caption', 'wait'] };
  const TIMED = ['link', 'story'];   // kinds with a wait before Claim
  const TASK_ICONS = ['telegram', 'xbrand', 'discord', 'gift', 'friends', 'pick', 'wallet', 'holder', 'up', 'gem', 'crown', 'cart', 'trophy', 'send', 'bolt'];
  const posInt = (v) => (Number.isFinite(Number(v)) && Number(v) >= 1 ? Math.floor(Number(v)) : null);
  const posNum = (v) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : null);
  /** A database row as a task (missing or bad fields get safe defaults). */
  function cleanTask(r) {
    const kind = KINDS.includes(r.kind) ? r.kind : 'link';
    const keys = NEEDS[kind];
    let need;
    if (keys) {
      const [k, v] = Object.entries(r.need || {}).find(([x]) => keys.includes(x)) || [keys[0], 1];
      need = { [k]: k === 'wallet' || k === 'pass' ? 1 : Math.max(1, Number(v) || 1) };
    }
    return { id: r.id, kind, group: r.group || 'Community', title: r.title, description: r.description || '', reward: Number(r.reward) || 0,
      url: r.url || '', chat: kind === 'channel' ? r.chat || '' : '', wait: TIMED.includes(kind) ? (r.wait === '' || r.wait == null ? (kind === 'story' ? 30 : 15) : Math.max(0, Number(r.wait) || 0)) : 0,
      caption: kind === 'story' ? String(r.caption || '').slice(0, 160) : '',
      ...(need ? { need } : {}), icon: TASK_ICONS.includes(r.icon) ? r.icon : 'gift', order: Number(r.order) || 0,
      maxCompletions: posInt(r.maxCompletions), repeatHours: posNum(r.repeatHours),
      geoMode: MODES.includes(r.geoMode) ? r.geoMode : 'all', geo: codes(r.geo, /^[A-Z]{2}$/),
      langMode: MODES.includes(r.langMode) ? r.langMode : 'all', langs: codes(r.langs, /^[a-z]{2}$/) };
  }
  const MODES = ['all', 'only', 'except'];
  const codes = (v, re) => (Array.isArray(v) ? [...new Set(v.map(String).filter((c) => re.test(c)))] : []);
  /** A player's two-letter language ('pt-br' -> 'pt'), or null. */
  const langOf = (lang) => (typeof lang === 'string' && /^[a-z]{2}/i.test(lang) ? lang.slice(0, 2).toLowerCase() : null);
  const inList = (mode, list, v) => (mode === 'only' ? !!v && list.includes(v) : mode === 'except' ? !(v && list.includes(v)) : true);
  /** Whether a task's audience includes a player {country, lang}. An unknown country / language is never "listed". */
  const audienceOk = (t, p) => inList(t.geoMode, t.geo || [], p.country || null) && inList(t.langMode, t.langs || [], langOf(p.lang));
  /** Every task in board order, with its `hidden` flag: the admin's view. */
  function allTasks(rows = []) {
    return rows.filter((r) => r && r.id && r.kind).map((r, i) => ({ t: { ...cleanTask(r), hidden: !!r.hidden }, i }))
      .sort((a, b) => (Number(a.t.order) || 0) - (Number(b.t.order) || 0) || a.i - b.i).map((x) => x.t);
  }
  /** The tasks players see. */
  const mergeTasks = (rows = []) => allTasks(rows).filter((t) => !t.hidden);

  /** Progress of an auto/hold task for a user summary {claims, wallet, pass, level, refs, verified, onchain}. Returns {have, need}. */
  function progress(task, u) {
    const [k, n] = Object.entries(task.need)[0];
    return { have: Math.min(Number(u[k] || 0), n), need: n };
  }

  /** Caption for a story task: the admin's text, always ending with @bot #SYM $SYM (missing tags are added). */
  function storyCaption(t, bot, sym) {
    const tags = [`@${bot}`, `#${sym}`, `$${sym}`];
    const base = String((t && t.caption) || '').trim();
    const missing = tags.filter((x) => !base.toLowerCase().split(/\s+/).includes(x.toLowerCase()));
    return [base, ...missing].filter(Boolean).join(' ').slice(0, 200);   // Telegram allows 200 characters without Premium
  }

  /** Hours between claims of a task (0 = one-time). */
  const repeatOf = (t) => (t.kind === 'hold' ? t.repeatHours || HOLD_EVERY_H : t.repeatHours || 0);

  /**
   * Status of one task for the Earn page, shared by the backend and the demo.
   * d = the user's saved record for this task ({started_at, done_at}), sum = progress summary.
   */
  function taskStatus(t, d, sum, now = Date.now()) {
    const rep = repeatOf(t), done = d && d.done_at;
    if (done && !rep) return { id: t.id, status: 'done' };
    if (done && now < done + rep * 3600e3) return { id: t.id, status: 'cooldown', readyAt: done + rep * 3600e3 };
    if (t.kind === 'auto' || t.kind === 'hold') { const p = progress(t, sum); return { id: t.id, status: p.have >= p.need ? 'ready' : 'locked', have: p.have, need: p.need }; }
    if (d && d.started_at && (!done || d.started_at > done)) return { id: t.id, status: 'started', readyAt: d.started_at + (t.wait || 0) * 1000 };
    return { id: t.id, status: 'todo' };
  }

  const nextCheckinReward = (streakAfter) => CHECKIN[(streakAfter - 1) % CHECKIN.length];

  // Tasks that count towards a friend's verification: everything except invite rewards (the Friends group).
  const countsForVerify = (t) => t.group !== 'Friends' && !(t.need && t.need.verified);

  return { DEFAULTS_VERSION, TIMED, storyCaption, REFERRAL, CHECKIN, STORAGE, STORAGE_PRICE_SHARE: PRICE_SHARE, storageCost, storageFill, storageGain, storagePayback, WITHDRAW, withdrawFee, HOLDER_MIN, DEFAULT_TASKS, KINDS, NEEDS, EDIT, TASK_ICONS, allTasks, mergeTasks, cleanTask, audienceOk, langOf, HOLD_EVERY_H, repeatOf, progress, taskStatus, nextCheckinReward, earnsShare, isVerified, countsForVerify };
});
