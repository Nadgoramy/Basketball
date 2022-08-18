import styled from "styled-components";
import { EmptyListPtopType } from "./EmptyList";
import noteamPng from "asserts/images/noTeam.png";
import noplayerPng from "asserts/images/noPlayer.png";

export const NoTeamStyled = styled.div<EmptyListPtopType>`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: auto 0px;
  }

  div {
    width: 482px;
    height: 320px;
    margin: 48px 37px;
    background-image: url(${(props) =>
      props.mode == "team" ? noteamPng : noplayerPng});
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      margin: 0;
      background-position: bottom;
      height: 225px;
    }
  }
  h2 {
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;
    text-align: center;
    color: ${({ theme }) => theme.colors.lightest_red};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 17px;
      line-height: 25px;
    }
  }
  span {
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    color: ${({ theme }) => theme.colors.grey};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
      line-height: 24px;
    }
  }
`;
