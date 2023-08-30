import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { ReactComponent as PatreonIcon } from '../icons/patreon.svg';
import { ReactComponent as BoostyIcon } from '../icons/boosty.svg';
import { ReactComponent as DonationAlertsIcon } from '../icons/donationalerts.svg';
import { ReactComponent as KoFiIcon } from '../icons/kofi.svg';

export const SupportModal = () => {
   return (
      <Container>
         <Title>Support us {'❤'}</Title>
         <Description>
            Thank you a bunch for considering to support this project! It truly
            wouldn't be the same without your incredible help and ongoing
            support.
         </Description>
         <Socials>
            <Button
               icon={<PatreonIcon />}
               onClick={() => window.open('https://patreon.com/Varke', 'blank')}
            >
               Patreon
            </Button>
            <Button
               icon={<BoostyIcon />}
               onClick={() => window.open('https://boosty.to/varke', 'blank')}
            >
               Boosty
            </Button>
            <Button
               icon={<DonationAlertsIcon />}
               onClick={() =>
                  window.open('https://www.donationalerts.com/r/varke', 'blank')
               }
            >
               DonationAlerts
            </Button>
            <Button
               icon={<KoFiIcon />}
               onClick={() => window.open('https://ko-fi.com/varke', 'blank')}
            >
               Ko-Fi
            </Button>
         </Socials>
      </Container>
   );
};

const Container = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const Title = styled.h2`
   color: ${(props) => props.theme.correctTextColor};
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 500;
   font-size: 24px;
   line-height: 24px;
`;

const Description = styled.span`
   color: ${(props) => props.theme.textColor};
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 500;
   font-size: 18px;
`;

const Socials = styled.div`
   display: flex;
   gap: 10px;
   width: 100%;
   justify-content: space-between;
   flex-wrap: wrap;
`;
