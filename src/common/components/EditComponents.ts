import { PropsType } from "common/components/Flex";
import styled from "styled-components";

export const StyledFlexRow = styled.div<PropsType>`
  display: flex;
  align-items: stretch;
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  margin: 0;
  column-gap:24px;

  &>div{
    flex: auto;
    width: 50%;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }  
  &>button{
    width:50%;
  }
 
`;

export const StyledFlexAutoDiv = styled.div<PropsType>`
  flex: auto;
  align-items: stretch;
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  margin: 0;
  column-gap:24px;
 
`;