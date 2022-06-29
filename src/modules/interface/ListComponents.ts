import { StyledFlex } from "common/components/Flex";
import styled from "styled-components";

export const StyledHeader = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 32px;
column-gap: 24px;

/*&>div{
  flex: 0 1 365px;
}*/

@media(max-width: ${({theme})=> theme.mobile}){
  flex-direction: column;  
  margin-bottom: 16px;  
  row-gap: 16px;
}
`;
export const StyledFooter = styled.div`
display: flex;
justify-content: space-between;
margin-top: 32px;
`;
export const StyledGrid = styled.div`
display: flex;
flex-wrap: wrap;
gap: 24px;
&>* {
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

export const StyledMainContainer= styled(StyledFlex)`
margin: 0;
@media (max-width: ${({ theme }) => theme.mobile}) {
  margin: 16px 12px;
}
`

export const HeaderFlex = styled.div`
  display: flex;
  align-items: "stretch";
  justify-content: "stretch";
  margin: 0;
  column-gap: 24px;
  max-width: 1010px;

  &>*{
    flex: 1 1 auto;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    margin: 0;
    row-gap: 16px;
  }
`;