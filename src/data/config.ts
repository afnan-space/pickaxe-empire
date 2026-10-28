export interface SiteConfig {
  miniApp: string;
  bot: string;
  channel: string;
  chat: string;
  x: string;
  discord: string;
  support: string;
  email: string;
  jettonMaster: string;
  buyUrl: string;
}

export const SITE: SiteConfig = {
  miniApp: 'https://t.me/PickaxeEmpireApp/app',
  bot: 'https://t.me/PickaxeEmpireApp',
  channel: 'https://t.me/PickaxeEmpireApp', // defaults / fallback
  chat: 'https://t.me/PickaxeEmpireApp',
  x: 'https://x.com/PickaxeEmpire',
  discord: 'https://discord.gg/pickaxeempire',
  support: 'https://t.me/PickaxeEmpireApp',
  email: 'hello@pickaxeempire.com',
  jettonMaster: 'EQC6jshzJS1bL0hKVtMfmfcHruJGJPMK7m5A4Oi-EMk6aR5h',
  buyUrl: 'https://t.me/Keepeyeapp/app?startapp=sw_5Y3NcMFOFO',
};

