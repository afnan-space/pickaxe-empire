export const CHECKIN_REWARDS = [
  { day: 1, amount: 3 },
  { day: 2, amount: 5 },
  { day: 3, amount: 7 },
  { day: 4, amount: 9 },
  { day: 5, amount: 11 },
  { day: 6, amount: 13 },
  { day: 7, amount: 15, chest: true },
];

export const WITHDRAW_RULES = {
  MIN: 500,
  FEES: [
    { label: 'Minimum withdrawal', value: '500 PXE' },
    { label: 'Fee from 500 to 4,999 PXE', value: '70 PXE' },
    { label: 'Fee from 5,000 to 9,999 PXE', value: '60 PXE' },
    { label: 'Fee from 10,000 PXE', value: '50 PXE' },
  ]
};

export const MILESTONES_TABLE = [
  { level: 'Lv 1', rank: 'Ngwenya I', hold: '0', perDay: '5' },
  { level: 'Lv 2', rank: 'Ngwenya I', hold: '100', perDay: '5' },
  { level: 'Lv 25', rank: 'Ngwenya III', hold: '130', perDay: '5.86' },
  { level: 'Lv 50', rank: 'Ngwenya V', hold: '174', perDay: '6.97' },
  { level: 'Lv 100', rank: 'Ngwenya X', hold: '310', perDay: '9.85' },
  { level: 'Lv 200', rank: 'Grimes Graves X', hold: '982', perDay: '19.69' },
  { level: 'Lv 300', rank: 'Rio Tinto X', hold: '3,110', perDay: '39.33' },
  { level: 'Lv 500', rank: 'Wadi Maghara X', hold: '31,300', perDay: '157' },
  { level: 'Lv 750', rank: 'Kolar V', hold: '559,000', perDay: '886' },
  { level: 'Lv 1000', rank: 'Ophir X', hold: '10M', perDay: '5,000' },
];

export const FAQ_DATA = [
  {
    q: 'What is Pickaxe Empire?',
    a: ['A mining game that runs as a Telegram Mini App. Your crew mines PXE every day, you climb 1,000 levels and travel through ten real ancient mines, and you can withdraw what you mine to your TON wallet.']
  },
  {
    q: 'Is it free to play?',
    a: ['Yes. Open the app and your first miner starts digging right away. Level 1 mines 5 PXE a day without holding anything. Holding more PXE raises your level and your daily mining.']
  },
  {
    q: 'How does mining work?',
    a: [
      'Once your Ancient Pass is in your wallet, your crew starts digging. Your level is set by everything you hold: your in-app balance plus the PXE in your connected TON wallet. Each level mines a set amount per day into your storage. Claim it to move it into your balance, which raises your holding again.',
      'Levels can also go down: withdrawing, buying boosts or selling from your wallet lowers your level right away.'
    ]
  },
  {
    q: 'Do I need a crypto wallet?',
    a: ['Yes. Mining needs an Ancient Pass, which is minted into your TON wallet (for example Telegram Wallet or Tonkeeper). The same wallet receives your withdrawals, and the PXE you hold in it counts towards your level.']
  },
  {
    q: 'What is the Ancient Pass?',
    a: ["A soulbound NFT, minted once for 0.1 GRAM into the wallet you connect. It can't be sold or transferred, so it proves the wallet belongs to you, and it opens your mine. Each pass carries an encrypted seal of your account that only Pickaxe Empire can read, and its art changes as you travel the ten mines. There is no limit on how many are minted; the earliest serial numbers are the rarest (Mythic, Legendary, Epic, then Rare)."]
  },
  {
    q: 'How do withdrawals work?',
    a: ['Connect your wallet, then withdraw from 500 PXE. A small fee is kept (shown before you confirm), and each request is checked for fair play before it is sent. Most are sent within 24 hours. If a withdrawal can\'t be sent, the full amount goes back to your balance.']
  },
  {
    q: 'How do friend rewards work?',
    a: ['Share your invite link from the app. You earn 5% of everything a friend claims from mining, for life, once they connect a TON wallet and mint their Ancient Pass. It never comes out of their share. A friend becomes verified after that, plus completing 3 tasks and checking in on 3 days, and then counts toward the "Invite verified friends" rewards.']
  },
  {
    q: 'Is my wallet safe?',
    a: ['Wallets connect through TON Connect and prove ownership with a signature. The game never sees your keys and will never ask for your seed phrase. Anyone who asks for it is not us.']
  },
  {
    q: 'Can I play with more than one account?',
    a: ['No. One Telegram account and one TON wallet per person. Multiple accounts, fake referrals and bots lead to removed rewards and banned accounts.']
  },
  {
    q: 'Is PXE an investment?',
    a: ['No. Pickaxe Empire is a game. PXE is a crypto token whose price can go up or down, and nothing here is financial advice. Only use what you can afford to lose.']
  }
];

