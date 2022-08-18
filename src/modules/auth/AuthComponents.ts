import styled from "styled-components";

interface IProps {
  url: any;
}

export const StyledImageContainer = styled.div<IProps>`
  position: relative;
  flex: 1 1 834px;
  height: 414px;
  margin: auto;

  background: #f5fbff;
  background-image: url("${(props: any) => props.url}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
    position: relative;
    width: 1px;
    height: 1px;
    left: 0px;
    top: 0px;
  }
`;

export const StyledFormContainer = styled.div`
  margin: auto;
  flex: 1 1 558px;
  padding: 0 24px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0 24px 0 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 49px;
    color: #344472;
    padding-bottom: 32px;
    margin: 0 0;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      text-align: center;
    }
  }

  form {
    width: 365px;
    margin: auto;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      margin: auto;
    }
  }

  div {
    margin-bottom: 18px;

    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.grey};
      margin: 0 0 8px 0;
    }
    button {
      height: 40px;
    }
  }

  nav {
    text-align: center;
    position: relative;
    top: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.grey};

    a {
      color: ${({ theme }) => theme.colors.lightest_red};
    }
  }
`;
