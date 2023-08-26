import React, { useState } from 'react';
import styled from 'styled-components';

export const Toggle = (props) => {
   const [active, setActive] = useState(false);
   return (
      <Container active={active} onClick={() => setActive(!active)}>
         {props.icon}
         {props.children}
      </Container>
   );
};

const Container = styled.button`
   padding-inline: 20px;
   border-radius: 10px;
   background: #2c323b;
   font-size: 16px;
   font-family: 'Noto Sans Mono', monospace;
   font-weight: 400;
   color: ${(props) => (props.active ? 'white' : '#939eae')};
   border: none;
   cursor: pointer;
   display: flex;
   gap: 10px;
   align-items: center;
   height: 40px;
   svg {
      fill: ${(props) => (props.active ? 'white' : '#939eae')};
   }
`;
