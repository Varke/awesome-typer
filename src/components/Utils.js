import { ENG_TEXT, FILTER, RUS_TEXT } from './Const';

// Функция для выбора рандомных предложений из текста
export const getRandomSentences = (
   language = FILTER.values.language.english,
   count = 3
) => {
   // Разбиваем текст на предложения
   const sentences =
      language === FILTER.values.language.english
         ? ENG_TEXT.trim().split(/\.\s+/)
         : RUS_TEXT.trim().split(/\.\s+/);

   // Генерируем рандомные индексы предложений
   const randomIndices = [];
   while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      if (!randomIndices.includes(randomIndex)) {
         randomIndices.push(randomIndex);
      }
   }
   // Выбираем предложения по рандомным индексам
   const selectedSentences = randomIndices.map((index) => sentences[index]);
   // Возвращаем выбранные предложения, объединенные в одну строку
   return selectedSentences.join('. ') + '.';
};

// Устанавливает цвет для каждого символа в зависимости от правильности ввода
export const getColorForChar = (theme, inputString, char, index) => {
   if (index >= inputString.length) {
      return theme.textColor; // Серый цвет для неактивных символов
   }
   if (inputString[index] === char) {
      return theme.correctTextColor; // Белый цвет для совпавших символов
   }
   return theme.errorTextColor; // Красный цвет для несовпавших символов
};

// Преобразовывает строковое значение размера в числовое
export const getNumericTextSize = (stringSize) => {
   switch (stringSize) {
      case FILTER.values.size.small:
         return 3;
      case FILTER.values.size.medium:
         return 6;
      case FILTER.values.size.large:
         return 9;
      default:
         return 3;
   }
};
