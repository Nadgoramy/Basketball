import React from "react";
import { TeamDto } from "api/Dto/teamDto";
import * as CardComponents from "common/components/CardComponents";
import { useNavigate } from "react-router-dom";

type PropsType = {
  team: TeamDto;
};

export const TeamCard: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const navigate = useNavigate();
  const routeChange = (id?: number) => {
    if (!id) return;
    const path = `/teams/` + id;
    navigate(path);
  };

  return (
    <CardComponents.StyledContainer
      key={props.team.id}
      onClick={() => routeChange(props.team.id)}
    >
      <CardComponents.StyledTeamImageContainer url={props.team.imageUrl} />
      <CardComponents.StyledTeamFooter>
        <h4 title={props.team.name}>{props.team.name?.someWords(3)}</h4>
        <h5>{"Year of foundation: " + props.team.foundationYear}</h5>
      </CardComponents.StyledTeamFooter>
    </CardComponents.StyledContainer>
  );
};