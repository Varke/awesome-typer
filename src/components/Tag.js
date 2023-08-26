import React from 'react';
import styled from 'styled-components';

export const Tag = (props) => {
   return <Container>{props.children}</Container>;
};

const Container = styled.div`
   padding: 10px 20px;
   border-radius: 10px;
   background: #2c323b;
   font-size: 14px;
   font-family: 'Noto Sans Mono', monospace;
   font-weight: 400;
   color: white;
`;
