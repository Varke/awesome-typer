import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { ReactComponent as CompleteIcon } from '../icons/complete_24dp.svg';
import { ReactComponent as ErrorIcon } from '../icons/error_24dp.svg';
import { ReactComponent as LanguageIcon } from '../icons/language_18dp.svg';
import { ReactComponent as NumbersIcon } from '../icons/numbers_18dp.svg';
import { ReactComponent as PunctuationIcon } from '../icons/punctuation_18dp.svg';
import { ReactComponent as RefreshIcon } from '../icons/refresh_18dp.svg';
import { ReactComponent as MoneyIcon } from '../icons/money_18dp.svg';
import { ReactComponent as CodeIcon } from '../icons/code_18dp.svg';
import { ReactComponent as StarsIcon } from '../icons/stars_18dp.svg';
import { ReactComponent as SentencesIcon } from '../icons/sentences_18dp.svg';
import { ReactComponent as PaletteIcon } from '../icons/palette_18dp.svg';

import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { Tag } from './Tag';
import { Timer } from './Timer';
import { Toggle } from './Toggle';
import { SocialButton } from './SocialButton';
import Modal from './Modal';
import { SupportModal } from './SupportModal';
import { Logo } from './Logo';
import { Statistics } from './Statistics';
import { FILTER } from './Const';
import {
   getColorForChar,
   getNumericTextSize,
   getRandomSentences,
} from './Utils';

const TyperScreen = (props) => {
   const theme = useTheme();
   const [inputString, setInputString] = useState('');
   const [timerEnabled, setTimerEnabled] = useState(false);
   const [originalString, setOriginalString] = useState('');
   const [cacheString, setCacheString] = useState('');
   const [errorCount, setErrorCount] = useState(0);
   const [modal, setModal] = useState(false);
   const [showStatistics, setShowStatistics] = useState(false);
   const [timestamps, setTimestamps] = useState([]);
   const [totalSymbols, setTotalSymbols] = useState(0);
   const [stringFilter, setStringFilter] = useState({
      [FILTER.keys.language]: 'English',
      [FILTER.keys.punctuation]: true,
      [FILTER.keys.numbers]: true,
      [FILTER.keys.sentences]: true,
      [FILTER.keys.size]: 'Small',
   });
   const inputRef = useRef(null);

   // Функция для установки фокуса на элементе. Нужно, чтобы на мобилке
   // появлялась клавиатура
   const setFocusOnInput = () => {
      inputRef.current.focus();
   };

   const changeInnerStateCallback = (key, option) => {
      const newFilter = { ...stringFilter, [key]: option };
      setStringFilter(newFilter);
      applyFilter(key, newFilter);
   };

   const applyFilter = (whatChanged, newFilter) => {
      let newString = cacheString;
      if (
         (whatChanged === FILTER.keys.language &&
            newFilter[FILTER.keys.language] !==
               stringFilter[FILTER.keys.language]) ||
         (whatChanged === FILTER.keys.size &&
            newFilter[FILTER.keys.size] !== stringFilter[FILTER.keys.size])
      ) {
         newString = getRandomSentences(
            newFilter[FILTER.keys.language],
            getNumericTextSize(newFilter[FILTER.keys.size])
         );
         setCacheString(newString);
      }
      // Убрать знаки препинания, если флаг выключен
      if (!newFilter[FILTER.keys.punctuation])
         newString = newString.replace(/[,#!$%^&*;:{}=\-_`~()]/g, '');

      // Убрать числа, если флаг выключен
      if (!newFilter[FILTER.keys.numbers])
         newString = newString.replace(/\d+/g, '');

      // Убрать разделение на предложения, если флаг выключен
      if (!newFilter[FILTER.keys.sentences])
         newString = newString.replace(/\. /g, ' ').toLowerCase().slice(0, -1);

      setOriginalString(newString);
   };

   const showSupportModal = () => {
      setModal(true);
   };

   useEffect(() => {
      const sentences = getRandomSentences();
      setOriginalString(sentences);
      setCacheString(sentences);
   }, []);

   const resetAll = () => {
      setInputString('');
      setTimerEnabled(false);
      setErrorCount(0);
      setTimestamps([]);
      setTotalSymbols(0);
      setShowStatistics(false);
   };

   const updateTimestamps = () => {
      const date = new Date(Date.now());
      // [key, total count]
      const key =
         date.getMinutes().toString() + '_' + date.getSeconds().toString();
      const existingData = timestamps.find(([index]) => index === key);
      if (existingData) {
         // Если запись уже существует, увеличиваем счетчик символов
         existingData[1] += 1;
      } else {
         // Если записи нет, создаем новую
         timestamps.push([key, 1]);
      }
      setTimestamps([...timestamps]);
   };

   // Обработчик нажатия клавиши
   useEffect(() => {
      const handleKeyDown = (event) => {
         // Исключаем Ctrl, Alt, и Meta (Cmd на Mac)
         if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            // Если нажали Backspace, нужно удалить последний введённый символ
            if (event.key === 'Backspace') {
               setInputString(inputString.slice(0, -1));
            }
            // Обрабатываем только символы длиной 1, чтобы не трогать служебные
            else if (event.key.length === 1) {
               setTotalSymbols(totalSymbols + 1);
               updateTimestamps();
               const newString = inputString + event.key;
               setInputString(newString);
               if (!timerEnabled) {
                  setTimerEnabled(true);
               }
               if (
                  newString.length > 0 &&
                  originalString.length > 0 &&
                  newString[newString.length - 1] !==
                     originalString[newString.length - 1]
               ) {
                  setErrorCount(errorCount + 1);
               }
               if (newString.length === originalString.length) {
                  setShowStatistics(true);
               }
            }
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [originalString, inputString, totalSymbols, errorCount]);

   return (
      <Container>
         <HiddenInput type={'text'} ref={inputRef} />
         <Modal isOpen={modal} onClose={() => setModal(false)}>
            <SupportModal></SupportModal>
         </Modal>
         <Logo></Logo>

         <VerticalFlex>
            {!showStatistics && (
               <>
                  <Options>
                     <Dropdown
                        options={Object.values(FILTER.values.language)}
                        icon={<LanguageIcon />}
                        changeCallback={changeInnerStateCallback}
                        filterKey={FILTER.keys.language}
                     ></Dropdown>
                     <Toggle
                        icon={<PunctuationIcon />}
                        changeCallback={changeInnerStateCallback}
                        filterKey={FILTER.keys.punctuation}
                     >
                        Punctuation
                     </Toggle>
                     <Toggle
                        icon={<NumbersIcon />}
                        changeCallback={changeInnerStateCallback}
                        filterKey={FILTER.keys.numbers}
                     >
                        Numbers
                     </Toggle>
                     <Toggle
                        icon={<SentencesIcon />}
                        changeCallback={changeInnerStateCallback}
                        filterKey={FILTER.keys.sentences}
                     >
                        Sentences
                     </Toggle>
                     <Dropdown
                        options={Object.values(FILTER.values.size)}
                        icon={<StarsIcon />}
                        changeCallback={changeInnerStateCallback}
                        filterKey={FILTER.keys.size}
                     ></Dropdown>
                  </Options>
                  <Tags>
                     <Tag icon={<CompleteIcon />}>
                        {inputString.length + '/' + originalString.length}
                     </Tag>
                     <Timer enable={timerEnabled} />
                     <Tag
                        icon={<ErrorIcon />}
                        custom_color={theme.errorTextColor}
                     >
                        {errorCount}
                     </Tag>
                  </Tags>
                  <TextContainer onClick={() => setFocusOnInput()}>
                     <TextWithLetters>
                        {originalString.length > 0 &&
                           originalString.split('').map((char, index) => (
                              <Letter
                                 key={index}
                                 color={getColorForChar(
                                    theme,
                                    inputString,
                                    char,
                                    index
                                 )}
                                 $needShowBeforeBlock={
                                    index === inputString.length
                                 }
                              >
                                 {char}
                              </Letter>
                           ))}
                     </TextWithLetters>
                  </TextContainer>
               </>
            )}
            {showStatistics && (
               <Statistics
                  data={timestamps}
                  spm={(originalString.length / timestamps.length) * 60}
                  total_symbols={originalString.length}
                  accuracy={1 - errorCount / totalSymbols}
                  total_errors={errorCount}
               />
            )}
            <Button onClick={() => resetAll()} icon={<RefreshIcon />}>
               Restart
            </Button>
         </VerticalFlex>

         <BottomButtons>
            <HorizontalFlex>
               <SocialButton
                  icon={<MoneyIcon />}
                  onClick={() => showSupportModal()}
               >
                  Support
               </SocialButton>
               <SocialButton
                  icon={<CodeIcon />}
                  onClick={() =>
                     window.open('https://github.com/Varke/typer', 'blank')
                  }
               >
                  Github
               </SocialButton>
            </HorizontalFlex>
            <SocialButton
               icon={<PaletteIcon />}
               onClick={() => props.toggleTheme()}
            >
               Switch theme
            </SocialButton>
         </BottomButtons>
      </Container>
   );
};

const HiddenInput = styled.input`
   position: absolute;
   left: -9999px;
`;

const HorizontalFlex = styled.div`
   display: flex;
   gap: 30px;
`;

const BottomButtons = styled.div`
   display: flex;
   justify-content: space-between;
   width: 75%;
   gap: 30px;
   @media (max-width: 768px) {
      width: 90%;
   }
`;

const VerticalFlex = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   gap: 20px;
`;

const Options = styled.div`
   display: flex;
   justify-content: center;
   width: 75%;
   gap: 10px;
   flex-wrap: wrap;
   @media (max-width: 768px) {
      width: 90%;
   }
`;

const Tags = styled.div`
   display: flex;
   width: 75%;
   gap: 30px;

   @media (max-width: 768px) {
      width: 90%;
   }
`;

const blinkingAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Letter = styled.span`
   position: relative;
   font-size: 24px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   user-select: none;
   color: ${(props) => props.color};
   &::before {
      content: '';
      display: ${(props) =>
         props.$needShowBeforeBlock
            ? 'block'
            : 'none'}; // Блоковое отображение для ::before
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      background-color: ${(props) => props.theme.pointerColor};
      animation: ${blinkingAnimation} 0.6s infinite alternate;
   }
`;

const TextContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   width: 75%;
   @media (max-width: 768px) {
      width: 90%;
   }
`;

const Container = styled.div`
   transition: 0.3s ease-in;
   background: ${(props) => props.theme.backgroundColor};
   width: 100%;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   gap: 60px;
   padding: 50px 0px;
`;

const TextWithLetters = styled.span`
   color: ${(props) => props.theme.correctTextColor};
   font-size: 24px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   user-select: none;
   margin-top: 0;
`;

export default TyperScreen;
