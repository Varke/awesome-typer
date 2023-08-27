import React from 'react';
import { ThemeProvider } from 'styled-components';

const basic = {
   backgroundColor: '#333a45',
   containerColor: '#2c323b',
   textColor: '#939eae',
   correctTextColor: 'white',
   errorTextColor: '#ca4754',
   pointerColor: 'green',
};

const Theme = (props) => {
   const theme = basic;
   return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
