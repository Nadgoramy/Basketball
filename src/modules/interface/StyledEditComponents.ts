import { StyledFlex } from "common/components/Flex";
import styled from "styled-components";

export const StyledHeaderContainer = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px 10px 0px 0px;
  color: ${({ theme }) => theme.colors.red};
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 69px;
  padding: 24px 32px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 48px;
    padding: 12px 16px;
    border-radius: 0;
    margin-top: 16px;

    font-size: 13px;
    line-height: 18px;
  }

  a {
    text-decoration: none;
    &a:-webkit-any-link {
      text-decoration: none;
    }
  }
`;

export const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 0;
  gap: 60px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    margin: 16px 24px;
    gap: 0px;
  }

  & > div {
    flex: 1 1 380px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      flex: 1 1 auto;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    max-width: 365px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-top: 0px;
      max-width: none;
    }
    & > div {
      height: 90px;
    }
    div > button {
      margin-top: 8px;
    }
    div > p {
      margin-top: 8px;
      margin-bottom: 2px;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }
  }
`;

export const StyledEditContainer = styled(StyledFlex)`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    //margin: 16px 24px;
  }
`;
