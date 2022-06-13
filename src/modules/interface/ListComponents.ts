import styled from "styled-components";

export const StyledHeader = styled.div`
display: flex;
flex-direction: row; 
justify-content: space-between;
margin-bottom: 32px;
column-gap: 24px;

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
display: grid;
grid-template-columns: 364px 364px 364px;
grid-auto-rows: 380px;
grid-gap: 24px;

@media (max-width: ${({ theme }) => theme.mobile}) {
  grid-template-columns: 170px 170px;
  grid-auto-rows: 180px;
  grid-gap: 12px;
}
`;