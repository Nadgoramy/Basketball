import { PlayerDto } from "api/Dto/playerDto";
import * as CardComponents from "common/components/CardComponents";
import { useNavigate } from "react-router-dom";

type PlayerCardPtopType = {
  player: PlayerDto;
};

export const PlayerCard: React.FunctionComponent<PlayerCardPtopType> = (
  props: PlayerCardPtopType
) => {
  const navigate = useNavigate();
  const routeChange = (id?: number) => {
    if (!id) return;
    const path = `/players/` + id;
    navigate(path);
  };

  return (
    <CardComponents.StyledContainer
      key={props.player.id}
      onClick={() => routeChange(props.player.id)}
    >
      <CardComponents.StyledPlayerImageContainer url={props.player.avatarUrl} />
      <CardComponents.StyledFooter>
        <h4 title={props.player.name}>
          {props.player.name}
          <span> &nbsp;#{props.player.number}</span>
        </h4>
        <span>{props.player.teamName}</span>
      </CardComponents.StyledFooter>
    </CardComponents.StyledContainer>
  );
};
