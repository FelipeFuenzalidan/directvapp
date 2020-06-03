/* eslint-disable import/no-default-export */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

import es from './locales/es'

const languageDetector = {
  async: false,
  type: 'languageDetector',
  detect: () => RNLocalize.findBestAvailableLanguage(['es']),
  init: () => {},
  cacheUserLanguage: () => {},
}

const resources = {
  es,
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .init({
    resources,
    lng: 'es',
    keySeparator: '.',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
