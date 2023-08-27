import React from 'react';
import styled from 'styled-components';

export const Button = (props) => {
   return (
      <Container onClick={() => props.onClick()}>
         {props.icon}
         {props.children}
      </Container>
   );
};

const Container = styled.button`
   padding-inline: 20px;
   border-radius: 10px;
   background: ${(props) => props.theme.containerBackgroundColor};
   font-size: 16px;
   line-height: 16px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   color: ${(props) => props.theme.textColor};
   display: flex;
   gap: 10px;
   align-items: center;
   height: 40px;
   border: none;
   cursor: pointer;
   user-select: none;
   svg {
      fill: ${(props) => props.theme.textColor};
   }
`;
