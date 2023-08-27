import React from 'react';
import styled from 'styled-components';

export const Tag = (props) => {
   return (
      <Container customColor={props.customColor}>
         {props.icon}
         {props.children}
      </Container>
   );
};

const Container = styled.div`
   /* padding-inline: 20px; */
   /* border-radius: 10px; */
   /* background: #2c323b; */
   font-size: 24px;
   line-height: 24px;
   font-family: 'Noto Sans Mono', monospace;
   font-weight: 400;
   color: ${(props) => props.customColor || props.theme.correctTextColor};
   display: flex;
   gap: 10px;
   align-items: center;
   /* height: 40px; */
   svg {
      fill: ${(props) => props.customColor || props.theme.correctTextColor};
   }
`;
