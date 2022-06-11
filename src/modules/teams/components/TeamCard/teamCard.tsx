import { render } from "@testing-library/react";
import React, { Component, useEffect } from "react";
import { TeamDto } from "api/Dto/teamDto";
import styled from "styled-components";

const StyledContainer = styled.div`
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: inline-block;
  position: relative;
  
`;
const StyledImageContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 65px 107px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: absolute;
    width: 58.4px;
    height: 50.68px;
    left: 56.34px;
    top: 31.59px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const StyledFooter = styled.div`
  position: absolute;
  height: 100px;
  bottom: 0;
  width: 100%;
  background: #303030;
  border-radius: 0px 0px 4px 4px;
  color: fff;
  text-align: center;

  h4 {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: #ffffff;
    margin-bottom: 8px;
  }
  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #9c9c9c;
  }
`;

type PropsType = {
  team: TeamDto;
};

export const TeamCard: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  return (
    <StyledContainer key={props.team.id}>
      <StyledImageContainer>
        <img src={props.team.imageUrl}></img>
      </StyledImageContainer>
      <StyledFooter>
        <h4>{props.team.name}</h4>
        <span>Year of foundation: {props.team.yearOfFoundation}</span>
      </StyledFooter>
    </StyledContainer>
  );
};

//   style={{ background: `url(${props.team.imageUrl})` }}
