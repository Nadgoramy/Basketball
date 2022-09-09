import { HTMLAttributes } from "react";
import styled from "styled-components";

export const StyledFlex = styled.div<PropsType>`
  display: flex;
  flex-direction: ${(props: PropsType) => props.direction || "row"};  
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  align-items: stretch;
  margin: 0;

  @media(max-width: ${({ theme }) => theme.mobile}){
    flex-direction: column;    
  }
`;

export const StyledFlexRow = styled.div<PropsType>`
  display: flex;
  flex-direction: ${(props: PropsType) => props.direction || "row"};  
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  align-items: stretch;
  margin: 0;

  @media(max-width: ${({ theme }) => theme.mobile}){
    flex-direction: row;    
  }
`;

export interface PropsType extends HTMLAttributes<HTMLHeadingElement> {
  direction?: string;
  justify?: string;
}

