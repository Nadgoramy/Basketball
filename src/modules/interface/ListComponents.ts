import { StyledFlex } from "common/components/Flex";
import styled from "styled-components";

export const StyledHeader = styled.div`
display: flex;
//justify-content: space-between;
margin-bottom: 32px;
column-gap: 24px;

&>div{
  flex: 0 1 364px;
  @media(max-width: ${({theme})=> theme.mobile}){
    flex-basis: 40px; 
  }
}
&>button{
  margin-left:auto
}

@media(max-width: ${({theme})=> theme.mobile}){
  flex-direction: column;  
  margin-bottom: 16px;  
  row-gap: 16px;
}
`;
export const StyledFooter = styled.div`
flex-shrink: 0;
flex-basis: 104px;
@media(max-width: ${({theme})=> theme.mobile}){
  flex-basis: 60px;
}

#footerFlex{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;  

  @media(max-width: ${({theme})=> theme.mobile}){
    height: 60px;
  }
}

`;

export const StyledGridContainer = styled.div`
flex: 1 0 auto;
`

export const StyledGrid = styled.div`
display: flex;
flex-wrap: wrap;
gap: 24px;
&>div {
  flex: 0 1 365px;
  height: 380px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex: 0 1 170px;
    height: 180px;
  }
}

@media (max-width: ${({ theme }) => theme.mobile}) {  
  gap: 12px;  
}
`;

export const StyledTeamGrid = styled.div`
display: flex;
flex-wrap: wrap;
gap: 24px;
&>* {
  flex: 0 1 365px;
  height: 380px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex: 0 1 170px;
    height: 201px;
  }
}

@media (max-width: ${({ theme }) => theme.mobile}) {  
  gap: 12px;  
}
`;

export const StyledMainContainer= styled(StyledFlex)`
margin: 0;
padding: 0;
min-height: calc(100vh - 112px);
position: relative;
@media (max-width: ${({ theme }) => theme.mobile}) {
  padding: 16px 12px 0 12px;
  min-height: calc(100vh - 72px);
}
`

export const HeaderFlex = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  margin: 0;
  column-gap: 24px;
  flex: 1 1 auto;

  &>*{
    flex: 1 1 auto;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    margin: 0;
    row-gap: 16px;
  }
`;