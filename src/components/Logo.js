import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { getColorForChar } from './Utils';

export const Logo = () => {
   const originalString = 'awesome-typer';
   const [inputString, setInputString] = useState('');
   const theme = useTheme();

   useEffect(() => {
      const interval = setInterval(() => {
         if (inputString.length < originalString.length) {
            const random = Math.random();
            if (random <= 0.8) {
               setInputString(inputString + originalString[inputString.length]);
            } else {
               setInputString(inputString + '.');
            }
         } else {
            setTimeout(() => {
               setInputString('');
            }, 5000); // Пауза в 5 секунд
            clearInterval(interval);
         }
      }, 150); // интервал между добавлением символов

      return () => clearInterval(interval);
   }, [inputString]);

   return (
      <Container href={'https://awesome-typer.netlify.app/'}>
         {originalString.length > 0 &&
            originalString.split('').map((char, index) => (
               <Letter
                  key={index}
                  color={getColorForChar(theme, inputString, char, index)}
               >
                  {char}
               </Letter>
            ))}
         <h6>made by varke</h6>
      </Container>
   );
};

const Letter = styled.span`
   transition: 0.45s ease;
   font-weight: 700;
   font-size: 32px;
   line-height: 24px;
   font-family: ${(props) => props.theme.fontFamily};
   user-select: none;
   color: ${(props) => props.color};
`;

const Container = styled.a`
   font-family: ${(props) => props.theme.fontFamily};
   color: ${(props) => props.theme.correctTextColor};
   user-select: none;
   cursor: pointer;
   text-decoration: none;
   h6 {
      text-align: center;
      font-weight: 400;
   }
`;
