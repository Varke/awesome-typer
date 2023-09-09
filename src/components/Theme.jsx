import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

const dark = {
   backgroundColor: '#333a45',
   containerBackgroundColor: '#2c323b',
   textColor: '#939eae',
   correctTextColor: '#FFF',
   errorTextColor: '#ca4754',
   pointerColor: '#61afef',
   fontFamily: "'Noto Sans Mono', monospace",
};

const light = {
   backgroundColor: '#EFF7FF',
   containerBackgroundColor: '#E4F2FF',
   textColor: '#364a5e',
   correctTextColor: '#04A6F4',
   errorTextColor: '#FF585B',
   pointerColor: '#38C7C2',
   fontFamily: "'Noto Sans Mono', monospace",
};

const Theme = (props) => {
   const [currentTheme, setCurrentTheme] = useState(dark);
   const toggleTheme = () => {
      setCurrentTheme(currentTheme === dark ? light : dark);
   };
   return (
      <ThemeProvider theme={currentTheme}>
         {React.Children.map(props.children, (child) =>
            React.cloneElement(child, { toggleTheme })
         )}
      </ThemeProvider>
   );
};

export default Theme;
