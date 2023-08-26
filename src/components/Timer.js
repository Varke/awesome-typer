import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as TimerIcon } from '../icons/timer_18dp.svg';

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
   padding-inline: 20px;
   border-radius: 10px;
   background: #2c323b;
   font-size: 16px;
   font-family: 'Noto Sans Mono', monospace;
   font-weight: 400;
   color: white;
   display: flex;
   gap: 5px;
   align-items: center;
   height: 40px;
   svg {
      fill: white;
   }
`;
