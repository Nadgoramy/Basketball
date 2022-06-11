import { AppStateType } from "core/redux/configureStore";
import React, { HTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import teamImg from "asserts/images/group_person.svg";
import playerImg from "asserts/images/person.svg";
import noUserImg from "asserts/images/profile.svg";
import SingoutImg from "asserts/images/singout.svg";
import { StyledFlex as Flex } from "common/components/Flex";


const menu = [
  {
    link: "/teams",
    label: "Teams",
    img: teamImg,
  },
  {
    link: "/players",
    label: "Players",
    img: playerImg,
  },
];

interface PropsType extends HTMLAttributes<HTMLHeadingElement> {
  show: boolean;
}
const StyledSideBar = styled.div<PropsType>`
  position: absolute;
  left: 0%;
  top: 80px;
  width: 140px;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 200px;
    display: ${(props) => (props.show ? "" : "none")};
  }
`;

const UserProfile = styled.div`
  height: 80px;
  border-bottom: 0.5px solid #9c9c9c;
  display: flex;
  text-align: center;

  div {
    padding: 16px 0 16px 16px;
    display: inline-box;
  }

  label {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;

    position: relative;
    top: -20px;
    color: #303030;
    margin-left: 8px;
  }
  img {
    width: 48px;
    height: 48px;
  }
  @media (min-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

const NavContainer = styled.div`
  text-align: center;
  margin: 0 0 0 0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    text-align: left;
    margin: 24px 0 24px 20px;
  }
`;

const NavBarLink = styled(Link)`
  padding: 36px 50px;
  display: inline-block;
  color: #ff768e;
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0 0;
    display: block;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 0 8px;
  }
  label {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      position: relative;
      top: -8px;
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;            
    }
  }
`;

const StyledLogOut = styled(Link)`
  position: absolute;
  bottom: 40px;
  padding: 0 0 36px 39px;
  display: flex;
  text-align: center;
  color: #ff768e;
  text-decoration: none;
  img {
    width: 24px;
    height: 24px;    
  }
  div{
    display: inline;
    @media (min-width: ${({ theme }) => theme.mobile}) {
      display:flex;
      text-align: center;
      padding-bottom: 32px;
    }
  }
  label {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      position: relative;
      top: -8px;
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      margin-left: 8px;
    }
  }

  @media (min-width: ${({ theme }) => theme.mobile}) {    
    padding: 0 0 36px 44px;
    display: block;
  }
`;

interface SideBarProps {
  isOpen: boolean;
}
const SideBar = (props: SideBarProps) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const singout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "REMOVE_USER" });
  };

  const userFromStore = useSelector((state: AppStateType) => state.user);
  console.log(props.isOpen);
  return (
    <StyledSideBar show={props.isOpen}>
      <UserProfile>
        <div>
          <img
            src={
              //userFromStore.avatarUrl > "" ? userFromStore.avatarUrl : noUserImg
              noUserImg
            }
          />
          <label>{userFromStore.name}</label>
        </div>
      </UserProfile>

      {menu.map((item) => (
        <NavContainer key={item.label}>
          <NavBarLink to={item.link}>
            <img src={item.img} />
            <label>{item.label}</label>
          </NavBarLink>
        </NavContainer>
      ))}

      <StyledLogOut to="/" onClick={singout}>
        <img src={SingoutImg} />
        <div>
          <label>Sing out</label>
        </div>
      </StyledLogOut>
    </StyledSideBar>
  );
};

export default SideBar;
