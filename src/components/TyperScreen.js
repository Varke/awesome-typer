import React, { useEffect, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { ReactComponent as CompleteIcon } from '../icons/complete_24dp.svg';
import { ReactComponent as ErrorIcon } from '../icons/error_24dp.svg';
import { ReactComponent as LanguageIcon } from '../icons/language_18dp.svg';
import { ReactComponent as NumbersIcon } from '../icons/numbers_18dp.svg';
import { ReactComponent as PunctuationIcon } from '../icons/punctuation_18dp.svg';
import { ReactComponent as RefreshIcon } from '../icons/refresh_18dp.svg';
import { ReactComponent as MoneyIcon } from '../icons/money_18dp.svg';
import { ReactComponent as CodeIcon } from '../icons/code_18dp.svg';

import { GetText } from '../requests/Text';
import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { Tag } from './Tag';
import { Timer } from './Timer';
import { Toggle } from './Toggle';
import { SocialButton } from './SocialButton';
import Modal from './Modal';
import { SupportModal } from './SupportModal';

const TyperScreen = () => {
   const theme = useTheme();
   // const originalString =
   //    'No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.';
   const [inputString, setInputString] = useState('');
   const [timerEnabled, setTimerEnabled] = useState(false);
   const [originalString, setOriginalString] = useState('');
   const [errorCount, setErrorCount] = useState(0);
   const [modal, setModal] = useState(false);

   let requestSended = false;

   const showSupportModal = () => {
      setModal(true);
   };

   /// temporary
   const setData = async () => {
      try {
         const fetchedData = await GetText();
         setOriginalString(fetchedData);
         return fetchedData;
      } catch (error) {
         // Обработка ошибок
      }
   };
   /// temporary
   useEffect(() => {
      if (!requestSended) {
         requestSended = true;
         setData();
      }
   }, [requestSended]);

   const resetAll = () => {
      setInputString('');
      setTimerEnabled(false);
      setErrorCount(0);
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
            }
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [originalString, inputString]);

   return (
      <Container>
         <Modal isOpen={modal} onClose={() => setModal(false)}>
            <SupportModal></SupportModal>
         </Modal>
         <div>Logo and other</div>
         <VerticalFlex>
            <Options>
               <Dropdown
                  options={['English', 'Russian', 'Chinese']}
                  icon={<LanguageIcon />}
               ></Dropdown>
               <Toggle icon={<PunctuationIcon />}>Punctuation</Toggle>
               <Toggle icon={<NumbersIcon />}>Numbers</Toggle>
            </Options>
            <Tags>
               <Tag icon={<CompleteIcon />}>
                  {inputString.length + '/' + originalString.length}
               </Tag>
               <Timer enable={timerEnabled} />
               <Tag icon={<ErrorIcon />} customColor={theme.errorTextColor}>
                  {errorCount}
               </Tag>
            </Tags>
            <TextContainer>
               {/* <Text ref={componentRef}>{str}</Text> */}
               <TextWithLetters>
                  {originalString.length > 0 &&
                     originalString.split('').map((char, index) => (
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
         </VerticalFlex>
         <Tags>
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
         </Tags>
      </Container>
   );
};

const VerticalFlex = styled.div`
   width: 100%;
   background: #333a45;
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
`;

const Tags = styled.div`
   display: flex;
   width: 75%;
   gap: 30px;
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
   width: 75%;
`;

const Container = styled.div`
   width: 100%;
   min-height: 100vh;
   background: #333a45;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   gap: 60px;
   padding: 50px 0px;
`;

const Text = styled.span`
   color: ${(props) => (props.active ? '#FFF' : '#939eae')};
   font-size: 24px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   user-select: none;
   margin-top: 0;
`;

const TextWithLetters = styled(Text)`
   color: ${(props) => props.theme.correctTextColor};
`;

export default TyperScreen;
