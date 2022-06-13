import React from "react";
import styled from "styled-components";
import logo from "asserts/images/logo.svg";
import { useSelector } from "react-redux";
import { AppStateType } from "core/redux/configureStore";
import noUserImg from "asserts/images/profile.svg";

const StyledHeader = styled.header`
  max-width:1440px;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;

  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(209, 209, 209, 0.5);

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0;
    height: 62px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  margin: 16px 51px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 40px;
  }
`;
const OpenLinkButton = styled.button`
  width: 24px;
  margin: 19px 12px;
  border: none;
  cursor: pointer;
  background: none;

  position: absolute;
  top: 0px;
  left: 0px;

  font-size: 36px;

  @media (min-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

const UserPrifile = styled.div`
padding: 22px 51px;
display: inline;

label{
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  padding-right: 19px;  
  color: #303030;

  position: relative;
  top: -12px;
}
img{
  width: 36px;
  height: 36px;  
}

@media (max-width: ${({ theme }) => theme.mobile}) {
  display: none;
}
`;

const Header = (props: any) => {
  const userFromStore = useSelector((state: AppStateType) => state.user);

  return (
    <StyledHeader>
      <Nav>
        <OpenLinkButton onClick={props.toggleMobileSideBar}>
          &#8801;
        </OpenLinkButton>
        <Logo src={logo} />
        <UserPrifile>
          <label>{userFromStore.name}</label>
          <img
            src={
              //userFromStore.avatarUrl >"" ? userFromStore.avatarUrl : "assserts/images/profile.svg"
              noUserImg
            }
          />
        </UserPrifile>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
