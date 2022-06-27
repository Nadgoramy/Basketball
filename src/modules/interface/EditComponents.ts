import { PropsType } from "common/components/Flex";
import styled from "styled-components";

export const StyledFlexRow = styled.div<PropsType>`
  display: flex;
  flex-direction: "row";
  align-items: ${(props: PropsType) => props.align || "stretch"};
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  margin: ${(props: PropsType) => props.margin || "0"};
  column-gap:24px;

  &>div{
    flex: auto;
    min-width: 150px;
    width: 50%;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }
 
`;

export const StyledFlexAutoDiv = styled.div<PropsType>`
  flex: auto;
  flex-direction: "row";
  align-items: ${(props: PropsType) => props.align || "stretch"};
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  margin: ${(props: PropsType) => props.margin || "0"};
  column-gap:24px;
 
`;