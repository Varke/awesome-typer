import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ExpandMoreIcon } from '../icons/expand_more_18dp.svg';

const DropdownContainer = styled.div`
   position: relative;
   display: inline-block;
`;

const DropdownButton = styled.button`
   padding-inline: 15px;
   border-radius: ${(props) => (props.isOpen ? '10px 10px 0px 0px' : '10px')};
   background: ${(props) => props.theme.containerBackgroundColor};
   font-size: 14px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   color: ${(props) =>
      props.active ? `${props.theme.correctTextColor}` : '#939eae'};
   border: none;
   cursor: pointer;
   display: flex;
   gap: 5px;
   align-items: center;
   height: 40px;
   svg {
      fill: ${(props) =>
         props.active ? `${props.theme.correctTextColor}` : '#939eae'};
   }
`;

const DropdownList = styled.ul`
   z-index: 5;
   font-family: ${(props) => props.theme.fontFamily};
   color: #939eae;
   position: absolute;
   top: 100%;
   left: 0;
   width: 100%;
   max-height: 200px;
   overflow: auto;
   list-style: none;
   background-color: #2c323b;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   border-radius: 0px 0px 10px 10px;
   padding: 0;
   margin: 0;
   transform-origin: top;
   transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});
   opacity: ${(props) => (props.isOpen ? 1 : 0)};
   transition:
      transform 0.2s ease,
      opacity 0.2s ease;
`;

const DropdownItem = styled.li`
   padding: 10px 15px;
   font-size: 14px;
   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
   cursor: pointer;
   transition: background-color 0.2s ease;

   &:hover {
      color: ${(props) => props.theme.correctTextColor};
   }
`;

export const Dropdown = ({ options, icon, changeCallback, filterKey }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      changeCallback(filterKey, option);
   };

   return (
      <DropdownContainer>
         <DropdownButton onClick={toggleDropdown} isOpen={isOpen}>
            {icon}
            {selectedOption || options[0]}
            <ExpandMoreIcon />
         </DropdownButton>
         <DropdownList isOpen={isOpen}>
            {options.map((option) => (
               <DropdownItem
                  key={option}
                  onClick={() => handleOptionClick(option)}
               >
                  {option}
               </DropdownItem>
            ))}
         </DropdownList>
      </DropdownContainer>
   );
};
