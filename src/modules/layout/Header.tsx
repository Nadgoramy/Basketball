import styled from "styled-components";
import logo from "asserts/images/logo.svg";
import { AppStateType } from "core/redux/configureStore";
import noUserImg from "asserts/images/profile.svg";
import { useAppSelector } from "core/redux/store";
import { themeColors } from "ThemeColors";
import React from "react";

const StyledHeader = styled.header`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;

  background: ${themeColors.white};
  box-shadow: 0px 1px 10px rgba(209, 209, 209, 0.5);

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0;
    height: 62px;
  }
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;
const Logo = styled.img`
  margin: 16px 51px;
  width: 191px;
  height: 48px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 14px auto;
    width: 137px;
    height: 34px;
  }
`;
const OpenLinkButton = styled.button`
  width: 24px;
  border: none;
  cursor: pointer;
  background: none;

  position: absolute;
  top: 0px;
  left: 12px;

  font-size: 36px;
  font-weight: 800;
  padding: 0;
  padding-top: 3px;

  @media (min-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;
const UserPrifile = styled.div`
  padding: 22px 51px;
  display: inline;

  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    padding-right: 19px;
    color: #303030;

    position: relative;
    top: -12px;
  }
  img {
    width: 36px;
    height: 36px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

interface IHeaderProps {
  toggleMobileSideBar: Function;
}

const Header = (props: IHeaderProps) => {
  const userFromStore = useAppSelector(
    (state: AppStateType) => state.user.currentUser
  );

  return (
    <StyledHeader>
      <Nav>
        <OpenLinkButton onClick={() => props.toggleMobileSideBar()}>
          &#8801;
        </OpenLinkButton>
        <Logo src={logo} />
        <UserPrifile>
          <label>{userFromStore?.name}</label>
          <img
            src={
              userFromStore && userFromStore.avatarUrl
                ? userFromStore?.avatarUrl
                : noUserImg
            }
          />
        </UserPrifile>
      </Nav>
    </StyledHeader>
  );
};

const areEqual = (prevProps: IHeaderProps, nextProps: IHeaderProps) => {
  /*if (prevProps.toggleMobileSideBar === nextProps.toggleMobileSideBar) {
    return true; // donot re-render
  }*/
  return true;
};
export default React.memo(Header, areEqual);
