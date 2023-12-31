import styled, { useTheme } from 'styled-components';
import {
   Area,
   AreaChart,
   CartesianGrid,
   ResponsiveContainer,
   XAxis,
   YAxis,
} from 'recharts';

export const Statistics = (props) => {
   const constructDataForGraph = (arrayData) => {
      return arrayData.map((element) => {
         return { value: element[1] * 60 };
      });
   };
   const theme = useTheme();
   return (
      <ContainerStyled>
         <ResponsiveContainer>
            <AreaChart data={constructDataForGraph(props.data)}>
               <defs>
                  <linearGradient id={`gradient`} x1="0" y1="0" x2="0" y2="1">
                     <stop
                        offset="5%"
                        stopColor={`${theme.correctTextColor}`}
                        stopOpacity={0.6}
                     />
                     <stop
                        offset="90%"
                        stopColor={`${theme.backgroundColor}`}
                        stopOpacity={0}
                     />
                  </linearGradient>
               </defs>
               <CartesianGrid
                  strokeDasharray="3 5"
                  stroke={theme.containerBackgroundColor}
               />
               <Area
                  stroke={`${theme.correctTextColor}`}
                  fillOpacity={1}
                  fill={`url(#gradient)`}
                  type="monotone"
                  dataKey="value"
                  strokeWidth={3}
               />
               <XAxis
                  tickLine={false}
                  tick={{
                     fill: `${theme.textColor}`,
                     fontSize: '14px',
                     fontFamily: `${theme.fontFamily}`,
                  }}
                  interval={'preserveStartEnd'}
                  axisLine={false}
                  tickFormatter={(tick, index) =>
                     index === 0 ? ' ' : index + 's'
                  }
               />
               <YAxis
                  width={40}
                  tickLine={false}
                  axisLine={false}
                  tick={{
                     fill: `${theme.textColor}`,
                     fontSize: '14px',
                     fontFamily: `${theme.fontFamily}`,
                  }}
                  tickFormatter={(tick) => (tick === 0 ? ' ' : tick)}
               />
            </AreaChart>
         </ResponsiveContainer>
         <ContainerWithNumericalResults>
            <CellWithData>
               <Number>{Math.round(props.spm)}</Number>
               <Description>
                  Symbols <br></br>per minute
               </Description>
            </CellWithData>
            <CellWithData>
               <Number>{Math.round(props.accuracy * 100)}%</Number>
               <Description>Accuracy</Description>
            </CellWithData>
            <CellWithData></CellWithData>
            <CellWithData>
               <Number>{props.total_symbols}</Number>
               <Description>
                  Text <br></br>length
               </Description>
            </CellWithData>
            <CellWithData>
               <Number>{props.total_errors}</Number>
               <Description>
                  Total <br></br>errors
               </Description>
            </CellWithData>
            <CellWithData>
               <Number>{props.data.length}s</Number>
               <Description>
                  Total <br></br>time
               </Description>
            </CellWithData>
         </ContainerWithNumericalResults>
      </ContainerStyled>
   );
};

const ContainerStyled = styled.div`
   width: 75%;
   height: 40vh;
   display: flex;
   flex-direction: column;
   gap: 20px;
   overflow: hidden;
   @media (max-width: 768px) {
      width: 90%;
   }
`;

const ContainerWithNumericalResults = styled.div`
   display: flex;
   gap: 20px;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
`;

const Number = styled.span`
   transition: 0.45s ease;
   font-weight: 700;
   font-size: 36px;
   line-height: 32px;
   font-family: ${(props) => props.theme.fontFamily};
   user-select: none;
   color: ${(props) => props.theme.correctTextColor};
`;

const Description = styled.span`
   position: relative;
   font-size: 14px;
   font-family: ${(props) => props.theme.fontFamily};
   font-weight: 400;
   user-select: none;
   color: ${(props) => props.theme.textColor};
`;

const CellWithData = styled.div`
   display: flex;
   gap: 10px;
   align-items: center;
`;
