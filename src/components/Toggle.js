import React, { useState } from 'react';
import styled from 'styled-components';

export const Toggle = (props) => {
   const [active, setActive] = useState(false);
   return (
      <Container $active={active} onClick={() => setActive(!active)}>
         {props.icon}
         {props.children}
      </Container>
   );
};

const Container = styled.button`
   padding-inline: 15px;
   border-radius: 10px;
   background: ${(props) => props.theme.containerBackgroundColor};
   font-size: 14px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   color: ${(props) => (props.$active ? 'white' : '#939eae')};
   border: none;
   cursor: pointer;
   display: flex;
   gap: 5px;
   align-items: center;
   height: 40px;
   svg {
      fill: ${(props) => (props.$active ? 'white' : '#939eae')};
   }
`;
