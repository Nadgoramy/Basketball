import styled from "styled-components";

export const StyledHeader = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 32px;
`;
export const StyledFooter = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 32px;
`;
export const StyledGrid = styled.div`
display: grid;
grid-template-columns: 364px 364px 364px;
grid-auto-rows: 380px;
grid-gap: 24px;

@media (max-width: ${({ theme }) => theme.mobile}) {
  grid-template-columns: 200px 200px;
  grid-auto-rows: 170px;
  grid-gap: 12px;
}
`;