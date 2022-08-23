import { AppStateType } from "core/redux/configureStore";
import { HTMLAttributes, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import teamImg from "asserts/images/group_person.svg";
import playerImg from "asserts/images/person.svg";
import teamImgActive from "asserts/images/group_person_active.svg";
import playerImgActive from "asserts/images/person_active.svg";
import noUserImg from "asserts/images/profile.svg";
import SingoutImg from "asserts/images/singout.svg";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { userActions } from "core/redux/userSlice";
import { errorActions } from "core/redux/errorSlice";

const menu = [
  {
    link: "/teams",
    label: "Teams",
    img: teamImg,
    imgActive: teamImgActive,
  },
  {
    link: "/players",
    label: "Players",
    img: playerImg,
    imgActive: playerImgActive,
  },
];

interface PropsType extends HTMLAttributes<HTMLHeadingElement> {
  show: boolean;
}
const StyledSideBar = styled.div<PropsType>`
  position: fixed;
  //height: 100%;
  width: 140px;
  left: 0;
  top: 80px;
  bottom: 0;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    top: 62px;
    width: 200px;
    z-index: 8888;
    background: ${({ theme }) => theme.colors.white};
    display: ${(props) => (props.show ? "" : "none")};
  }
`;

const UserProfile = styled.div`
  height: 80px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.light_grey};
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
    color: ${({ theme }) => theme.colors.dark_grey};
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
  padding: 0 0 0 0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    text-align: left;
    padding: 24px 0 0px 20px;
  }
  .active {
    color: ${({ theme }) => theme.colors.lightest_red};
  }
`;
const LogOutContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightest_red};
  margin-top: auto;
  height: 108px;
  padding: 0;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    text-align: left;
    padding: 24px 0 24px 20px;
    height: 24px;
  }
`;
const SingOutLink = styled(Link)`
  padding: 30px 35px 0 35px;
  display: inline-block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.lightest_red};
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0;
    display: block;
  }
  img {
    width: 24px;
    height: 24px;
    margin: auto;
    display: block;
    padding-right: 0px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding-right: 8px;
      display: inline;
    }
  }
  label {
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      position: relative;
      top: -8px;
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
    }
  }
`;

const NavBarLink = styled(Link)`
  padding-top: 32px;
  margin: auto;
  width: 40px;
  display: inline-block;
  color: ${({ theme }) => theme.colors.light_grey};
  text-decoration: none;
  .active {
    color: ${({ theme }) => theme.colors.lightest_red};
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0;
    display: block;
    height: 24px;
    margin: 0;
    width: auto;
  }

  img {
    width: 24px;
    height: 24px;
    padding-right: 0px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding-right: 8px;
    }
  }
  label {
    position: relative;
    top: -4px;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    cursor: pointer;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      position: relative;
      top: -8px;
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
    }
  }
`;

interface SideBarProps {
  isOpen: boolean;
  activeItem: "team" | "player";
}
const SideBar = (props: SideBarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(
    (state: AppStateType) => state.user.isLoggedIn
  );
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(errorActions.clearErrorMessage());
      navigate("/");
    }
  }, [isLoggedIn]);
  const singout = () => {
    dispatch(userActions.removeUser());
  };

  const userFromStore = useAppSelector(
    (state: AppStateType) => state.user.currentUser
  );
  const itemIsActive = (item: any) => item.link.indexOf(props.activeItem) > 0;

  if (userFromStore)
    return (
      <StyledSideBar show={props.isOpen}>
        <UserProfile>
          <div>
            <img
              src={
                userFromStore.avatarUrl ? userFromStore.avatarUrl : noUserImg
              }
            />
            <label>{userFromStore.name}</label>
          </div>
        </UserProfile>

        {menu.map((item) => (
          <NavContainer
            key={item.label}
            className={itemIsActive(item) ? "active" : ""}
          >
            <NavBarLink
              to={item.link}
              className={itemIsActive(item) ? "active" : ""}
            >
              <img src={itemIsActive(item) ? item.imgActive : item.img} />
              <label>{item.label}</label>
            </NavBarLink>
          </NavContainer>
        ))}
        <LogOutContainer key="singOut" className="active singout">
          <SingOutLink to="/" onClick={singout}>
            <img src={SingoutImg} />
            <label>Sign out</label>
          </SingOutLink>
        </LogOutContainer>
      </StyledSideBar>
    );
  else return <></>;
};

export default SideBar;
