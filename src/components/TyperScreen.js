import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as LanguageIcon } from '../icons/language_18dp.svg';
import { ReactComponent as NumbersIcon } from '../icons/numbers_18dp.svg';
import { ReactComponent as PunctuationIcon } from '../icons/punctuation_18dp.svg';
import { ReactComponent as RefreshIcon } from '../icons/refresh_18dp.svg';

import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { Tag } from './Tag';
import { Timer } from './Timer';
import { Toggle } from './Toggle';

const TyperScreen = () => {
   const originalString =
      'No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.';
   const [inputString, setInputString] = useState('');
   const [timerEnabled, setTimerEnabled] = useState(false);

   const resetAll = () => {
      setInputString('');
      setTimerEnabled(false);
   };

   const getColorForChar = (char, index) => {
      if (index >= inputString.length) {
         return '#939eae'; // Серый цвет для неактивных символов
      }
      if (inputString[index] === char) {
         return 'white'; // Белый цвет для совпавших символов
      }
      return '#ca4754'; // Красный цвет для несовпавших символов
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
               setInputString(inputString + event.key);
               if (!timerEnabled) {
                  console.log('make timer enable');
                  setTimerEnabled(true);
               }
            }
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [inputString]);

   return (
      <Container>
         <Options>
            <Dropdown
               options={['English', 'Russian', 'Chinese']}
               icon={<LanguageIcon />}
            ></Dropdown>
            <Toggle icon={<PunctuationIcon />}>Punctuation</Toggle>
            <Toggle icon={<NumbersIcon />}>Numbers</Toggle>
         </Options>
         <Tags>
            <Tag>{inputString.length + '/' + originalString.length}</Tag>
            <Timer enable={timerEnabled} />
         </Tags>
         <TextContainer>
            {/* <Text ref={componentRef}>{str}</Text> */}
            <TextWithLetters>
               {originalString.split('').map((char, index) => (
                  <Letter
                     color={getColorForChar(char, index)}
                     needShowBeforeBlock={index === inputString.length}
                  >
                     {char}
                  </Letter>
               ))}
            </TextWithLetters>
         </TextContainer>
         <Button onClick={() => resetAll()} icon={<RefreshIcon />}>
            Restart
         </Button>
      </Container>
   );
};

const Options = styled.div`
   display: flex;
   justify-content: center;
   width: 80%;
   gap: 10px;
`;

const Tags = styled.div`
   display: flex;
   width: 80%;
   gap: 10px;
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
   font-family: 'Noto Sans Mono', monospace;
   font-weight: 400;
   user-select: none;
   color: ${(props) => props.color};
   &::before {
      content: '';
      display: ${(props) =>
         props.needShowBeforeBlock
            ? 'block'
            : 'none'}; // Блоковое отображение для ::before
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      background-color: green;
      animation: ${blinkingAnimation} 0.6s infinite alternate;
   }
`;

const TextContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   width: 80%;
`;

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background: #333a45;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 20px;
`;

const Text = styled.span`
   color: ${(props) => (props.active ? '#FFF' : '#939eae')};
   font-size: 24px;
   font-family: 'Noto Sans Mono', monospace;
   font-weight: 400;
   user-select: none;
   margin-top: 0;
`;

const TextWithLetters = styled(Text)`
   color: white;
`;

export default TyperScreen;
