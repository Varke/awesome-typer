import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as TimerIcon } from '../icons/timer_24dp.svg';

export const Timer = (props) => {
   const [seconds, setSeconds] = useState(0);

   useEffect(() => {
      if (props.enable) {
         const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
         }, 1000); // Обновляем каждую секунду

         // Очищаем интервал при размонтировании компонента
         return () => {
            clearInterval(intervalId);
         };
      } else {
         setSeconds(0);
      }
   }, [props.enable]);

   return (
      <Container>
         <TimerIcon />
         {seconds + 's'}
      </Container>
   );
};

const Container = styled.div`
   font-size: 24px;
   line-height: 24px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   color: ${(props) => props.theme.correctTextColor};
   display: flex;
   gap: 10px;
   align-items: center;
   height: 40px;
   svg {
      fill: ${(props) => props.theme.correctTextColor};
   }
`;
