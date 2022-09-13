import all from './all.json';

/*
  ! The all.json file contains the translations tranferred from sense-client
  ! They have been retrieved by running the code bellow:

  const retrieveTranslation = async(lang, text) => {
    await Translator.setup(lang);
    return `"${lang}": "${translator(text)}",\n`;
  };

  const displayTranslationStrings = async (text) => {
    let consoleLogText = `translations for the text = ${text}\n`;
    const langs = [
      "en-US", "zh-TW", "zh-CN", "tr-TR",
      "sv-SE", "it-IT", "es-ES", "de-DE", "pl-PL",
      "nl-NL", "ko-KR", "pt-BR", "fr-FR", "ja-JP", "ru-RU"
    ];
    for(let j=0; j< langs.length; j++ ) {
      consoleLogText += await retrieveTranslation(langs[j], text);
    }
    if (text) console.log(consoleLogText);
  };

  const initializeTranslationRetrieval = async () => {
    const textList =[
      "Object.Container.AddItem",
    ];

    for(let i = 0;  i < textList.length; i++) {
      await displayTranslationStrings(textList[i]);
    }
  };

  ! In order to add a new translation from sense-client follow the steps:
  ! - update the textList of the initializeTranslationRetrieval function with the translation that you wish to retrieve
  ! - copy-paste the functions to sense-client's code and make sure it will run once when starting the client
  ! - open the developer tools in your browser and check that the translations displayed are retrieved correctly
  ! - add the translations from the console to the all.json file
*/

export default function autoRegister(translator: TranslatorType) {
  if (translator && translator.get && translator.add) {
    const t = 'Object.Container.AddItem';
    const g = translator.get(t);
    // if translated string is different from its id
    // assume translations already exists for current locale
    if (g !== t) {
      return;
    }

    Object.keys(all).forEach((key) => {
      translator.add((all as any)[key]);
    });
  }
}
