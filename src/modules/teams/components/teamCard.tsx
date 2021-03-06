import { render } from "@testing-library/react";
import React from "react";
import { TeamDto } from "api/dto/teamDto";
import * as CardComponents from "modules/interface/CardComponents"
import { useNavigate } from "react-router-dom";

type PropsType = {
  team: TeamDto;
};

export const TeamCard: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {

  let navigate = useNavigate(); 
  const routeChange = (id: number | undefined) =>{ 
    if(!id) return;
    let path = `/teams/`+id; 
    navigate(path);
  }

  return (
    <CardComponents.StyledContainer key={props.team.id} onClick={()=> routeChange(props.team.id)}>
      <CardComponents.StyledTeamImageContainer url={props.team.imageUrl} />
      <CardComponents.StyledTeamFooter>
        <h4>{props.team.name}</h4>
        <span>Year of foundation: {props.team.foundationYear}</span>
      </CardComponents.StyledTeamFooter>
    </CardComponents.StyledContainer>
  );
};


function useHistory() {
  throw new Error("Function not implemented.");
}

