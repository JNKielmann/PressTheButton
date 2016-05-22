import I18n from 'react-native-i18n'
import en from './translations/en'
import de from './translations/de'

export function init() {
	I18n.fallbacks = true;

	I18n.translations = {
	  en: en,
	  de: de
	}
}