import en from './en.json' assert { type: "json" };
import pl from './pl.json' assert { type: "json" };


const translations = { en, pl };

export default function t(lang, key, vars = {}) {
	const langData = translations[lang] || translations.en;
	let text = langData[key] || key;


	for (const k in vars) {
		text = text.replace(`{{${k}}}`, vars[k]);
	}

	return text;
}
