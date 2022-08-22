import { APP_INITIALIZER, LOCALE_ID } from "@angular/core";
import { defaultInterpolationFormat, I18NextModule, I18NEXT_SERVICE, ITranslationService } from "angular-i18next";
import { InitOptions } from "i18next";

export function appInit(i18next: ITranslationService) {
  return () => i18next
  //.use(i18nextXHRBackend)
  //.use(i18nextLanguageDetector)
  .init({
      whitelist: ['en', 'he'],
      fallbackLng: 'en',
      debug: true,
      returnEmptyString: false,
      ns: [
        'translation'
      ],
      interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
      },
      backend: {
        loadPath: 'assets/locales/{{lng}}.json',
      },
    } as InitOptions);
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
{
  provide: APP_INITIALIZER,
  useFactory: appInit,
  deps: [I18NEXT_SERVICE],
  multi: true
},
{
  provide: LOCALE_ID,
  deps: [I18NEXT_SERVICE],
  useFactory: localeIdFactory
}];
