import { render } from "@testing-library/react";
import { PlayerDto } from "api/Dto/playerDto";
import * as CardComponents from "modules/interface/CardComponents";
import { Link, useNavigate } from "react-router-dom";

type PlayerCardPtopType = {
  player: PlayerDto;
};

export const PlayerCard: React.FunctionComponent<PlayerCardPtopType> = (props : PlayerCardPtopType) =>{
  let navigate = useNavigate(); 
  const routeChange = (id: number | undefined) =>{ 
    if(!id) return;
    let path = `/player/`+id; 
    navigate(path);
  }
  
  return (      
    <CardComponents.StyledContainer key={props.player.id} onClick={()=> routeChange(props.player.id)}>
      <CardComponents.StyledPlayerImageContainer>        
          <img src={props.player.avatarUrl} alt="" /> 
      </CardComponents.StyledPlayerImageContainer>
      <CardComponents.StyledFooter>
        <h4>
          {props.player.name}<span>#{props.player.number}</span>
        </h4>
        <span>{props.player.teamName}</span>
      </CardComponents.StyledFooter>
    </CardComponents.StyledContainer>    
  );
}