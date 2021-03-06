import { HTMLAttributes } from "react";
import styled from "styled-components";

export const StyledFlex = styled.div<PropsType>`
  display: flex;
  flex-direction: ${(props: PropsType) => props.direction || "row"};
  align-items: ${(props: PropsType) => props.align || "stretch"};
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  margin: ${(props: PropsType) => props.margin || "0"};

  @media(max-width: ${({theme})=> theme.mobile}){
    flex-direction: column;    
  }
`;

export const StyledFlexRow = styled.div<PropsType>`
  display: flex;
  flex-direction: ${(props: PropsType) => props.direction || "row"};
  align-items: ${(props: PropsType) => props.align || "stretch"};
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  margin: ${(props: PropsType) => props.margin || "0"};
  //align-self: ${(props: PropsType)=> props.alignSelf || "center"}

  @media(max-width: ${({theme})=> theme.mobile}){
    flex-direction: row;    
  }
`;

export interface PropsType extends HTMLAttributes<HTMLHeadingElement>{
  direction?: string;
  align?: string;
  justify?: string;
  margin?: string;
  className?: string;
  children?: any;
  alignSelf?: string;
}

