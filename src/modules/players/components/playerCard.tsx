import { PlayerDto } from "api/Dto/playerDto";
import * as CardComponents from "common/components/CardComponents";
import { useNavigate } from "react-router-dom";
import 'common/helpers/stringHelper';

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
      <CardComponents.StyledPlayerFooter>

        <h4>{props.player.name?.someWords(2)}
          <span className="number">&nbsp;#{props.player.number}</span>
        </h4>
        <h5>{props.player.teamName?.someWords(3)}</h5>

      </CardComponents.StyledPlayerFooter>
    </CardComponents.StyledContainer>
  );
};

 //<CardComponents.StyledInfoContainer></CardComponents.StyledInfoContainer>
/*
<h4 title={props.player.name}>
          {props.player.name}
          <span> &nbsp;#{props.player.number}</span>
        </h4>
        <span>{props.player.teamName}</span>
        */