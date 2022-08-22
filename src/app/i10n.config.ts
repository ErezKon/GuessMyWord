import { L10nConfig } from "angular-l10n";

import * as en from  '../assets/locales/en.translation.json';
import * as he from  '../assets/locales/he.translation.json';
const i18nAsset = {
  'en-US': en,
  'he-IL': he,
};

export const enLocale = { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } };
export const heLocale = { language: 'he-IL', currency: 'ILS', timeZone: 'Asia/Jerusalem', units: { 'length': 'kilometer' } };

export const l10nConfig: L10nConfig = {
  format: 'language-region',
  providers: [
      { name: 'app', asset: i18nAsset }
  ],
  cache: true,
  keySeparator: '.',
  defaultLocale: { language: 'he-IL', currency: 'ILS', timeZone: 'Asia/Jerusalem' },
  schema: [
      { locale: enLocale, dir: 'ltr', text: 'United States' },
      { locale: heLocale, dir: 'rtl', text: 'Israel' }
  ],
  defaultRouting: true,
};
