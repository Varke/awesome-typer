import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TyperScreen = () => {
   const str =
      'Nam molestie, eros id mattis hendrerit, tortor nisl auctor nunc, eu vulputate magna nisl id torto';
   const strArray = str.split('');
   const [newArray, setNewArray] = useState([]);

   const isCharacterActive = (index) => {
      console.log(newArray[index], ' == ', strArray[index]);
      if (newArray.length > index && newArray[index] == strArray[index])
         return true;
      return false;
   };

   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.key != 'Shift') {
            setNewArray((prevArray) => [...prevArray, event.key]);
            console.log(newArray);
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [newArray]);

   return (
      <Container>
         <TextContainer>
            {strArray.map((character, index) => (
               <Text key={index} active={isCharacterActive(index)}>
                  {character}
               </Text>
            ))}
         </TextContainer>
      </Container>
   );
};

const TextContainer = styled.div`
   display: flex;
   white-space: pre-wrap;
`;

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background: #333a45;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding-inline: 100px;
`;

const Text = styled.p`
   color: ${(props) => (props.active ? '#FFF' : '#939eae')};
   font-size: 36px;
   font-family: Bricolage Grotesque;
   font-weight: 500;
   user-select: none;
`;

const UpText = styled(Text)`
   color: white;
`;

export default TyperScreen;
