import styled from "styled-components";

export const StyledHeaderContainer = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px 10px 0px 0px;
  color: ${({ theme }) => theme.colors.red};

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 69px;
  padding: 24px 32px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 48px;
    padding: 12px 16px;
    border-radius: 0;
  }

  a {
    textdecoration: none;
    &a:-webkit-any-link {
      textdecoration: none;
    }
  }
`;

export const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: "row";
  align-items: "stretch";
  margin: 0;

  @media(max-width: ${({ theme }) => theme.mobile}){
    flex-direction: column;    
  }

  &>div{
    flex: 1 1 380px;
    min-width: 400px;
  }
`;
