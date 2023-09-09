import React, { useState } from 'react';
import styled from 'styled-components';

export const Toggle = (props) => {
   const [active, setActive] = useState(true);

   const changeHandler = () => {
      const newValue = !active;
      setActive(newValue);
      props.changeCallback(props.filterKey, newValue);
   };

   return (
      <Container $active={active} onClick={() => changeHandler()}>
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
   color: ${(props) =>
      props.$active ? props.theme.correctTextColor : props.theme.textColor};
   border: none;
   cursor: pointer;
   display: flex;
   gap: 5px;
   align-items: center;
   height: 40px;
   svg {
      fill: ${(props) =>
         props.$active ? props.theme.correctTextColor : props.theme.textColor};
   }
`;
