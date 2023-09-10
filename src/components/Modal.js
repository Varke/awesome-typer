import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 5;
`;

const ModalContent = styled.div`
   background: ${(props) => props.theme.backgroundColor};
   border-radius: 10px;
   padding: 20px;
   max-width: 50%;
   @media (max-width: 962px) {
      max-width: 90%;
   }
`;

const Modal = ({ isOpen, onClose, children }) => {
   const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
         onClose();
      }
   };

   if (!isOpen) return null;

   return (
      <Container onClick={handleOverlayClick}>
         <ModalContent>{children}</ModalContent>
      </Container>
   );
};

export default Modal;
