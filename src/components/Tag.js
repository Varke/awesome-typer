import React from 'react';
import styled from 'styled-components';

export const Tag = (props) => {
   return (
      <Container custom_color={props.custom_color}>
         {props.icon}
         {props.children}
      </Container>
   );
};

const Container = styled.div`
   /* padding-inline: 20px; */
   /* border-radius: 10px; */
   /* background: ${(props) => props.theme.containerBackgroundColor}; */
   font-size: 24px;
   line-height: 24px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   color: ${(props) => props.custom_color || props.theme.correctTextColor};
   display: flex;
   gap: 10px;
   align-items: center;
   /* height: 40px; */
   svg {
      fill: ${(props) => props.custom_color || props.theme.correctTextColor};
   }
`;
