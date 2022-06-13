import { render } from "@testing-library/react";
import React from "react";
import { TeamDto } from "api/Dto/teamDto";
import styled from "styled-components";
import * as CardComponents from "modules/interface/CardComponents"
import { useNavigate } from "react-router-dom";

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

type PropsType = {
  team: TeamDto;
};

export const TeamCard: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {

  let navigate = useNavigate(); 
  const routeChange = (id: number | undefined) =>{ 
    if(!id) return;
    let path = `/team/`+id; 
    navigate(path);
  }

  return (
    <CardComponents.StyledContainer key={props.team.id} onClick={()=> routeChange(props.team.id)}>
      <CardComponents.StyledTeamImageContainer>
        <img src={props.team.imageUrl}></img>
      </CardComponents.StyledTeamImageContainer>
      <CardComponents.StyledFooter>
        <h4>{props.team.name}</h4>
        <span>Year of foundation: {props.team.foundationYear}</span>
      </CardComponents.StyledFooter>
    </CardComponents.StyledContainer>
  );
};


