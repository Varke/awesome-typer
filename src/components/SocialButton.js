import React from 'react';
import styled from 'styled-components';

export const SocialButton = (props) => {
   return (
      <Container onClick={() => (props.onClick ? props.onClick() : {})}>
         {props.icon}
         {props.children}
      </Container>
   );
};

const Container = styled.button`
   background: none;
   font-size: 14px;
   line-height: 14px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   color: ${(props) => props.theme.textColor};
   display: flex;
   gap: 5px;
   align-items: center;
   height: 40px;
   border: none;
   cursor: pointer;
   user-select: none;
   svg {
      fill: ${(props) => props.theme.textColor};
   }

   &:hover {
      color: ${(props) => props.theme.correctTextColor};
      svg {
         fill: ${(props) => props.theme.correctTextColor};
      }
   }
`;
