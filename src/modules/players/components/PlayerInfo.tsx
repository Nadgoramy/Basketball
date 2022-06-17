import { StyledFlex } from "common/components/Flex";
import { AppStateType } from "core/redux/configureStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,  
} from "react-router-dom";
import * as Info from "modules/interface/InfoComponents"
import { requestPlayer } from "../helpers/playerHelper";
import { DeleteLink, EditLink} from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";

type PlayerInfoPtopType = React.HTMLAttributes<HTMLElement> & {};

export const PlayerInfo: React.FunctionComponent<PlayerInfoPtopType> = (
  props: PlayerInfoPtopType
) => {
  const dispatch = useDispatch();
  const player = useSelector((state: AppStateType) => state.player.player);
  const params = useParams();
  let { id } = useParams();

  useEffect(() => {
    console.log(params);
    if (!id) return;
    let playerId = parseInt(id);
    requestPlayer(playerId, dispatch);
  }, [id]);

  let navigate = useNavigate();
  const routeChange = (id: number) => {
    let path = `/editplayer/` + id;
    navigate(path);
  };  

  const getAge = (birthday: Date | undefined) => {
    if (!birthday) return "";
    let age = new Date(Date.now() - new Date(birthday).getTime());
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const handleDeleteClick = (e: any) =>{

  }

  return (
    <StyledFlex>
      <Info.StyledContainer>
        {!player && <div className="noPlayer">No player found</div>}
        {player && (
          <div>
            <Info.StyledHeaderContainer>
              <div >
                <StyledLink to="/players">Players</StyledLink>
                <span> / </span>
                <span>{player.name}</span>
              </div>
              <StyledFlex >              
                <EditLink to={"/editPlayer/"+id}/>
                <DeleteLink onClick={handleDeleteClick} to="#0"/>
              </StyledFlex>
            </Info.StyledHeaderContainer>
            <Info.StyledMainContainer>
              <Info.StyledPhotoContainer url={player.avatarUrl}>
                
              </Info.StyledPhotoContainer>
              <Info.StyledDescriptionContainer>
                <h2>
                  {player.name} <span>#{player.number}</span>
                </h2>
                <Info.StyledDescriptionRow>
                  <div>
                    <label>Position</label>
                    <p>{player.position}</p>
                  </div>
                  <div>
                    <label>Team</label>
                    <p>{player.teamName}</p>
                  </div>
                </Info.StyledDescriptionRow>
                <Info.StyledDescriptionRow>
                  <div>
                    <label>Height</label>
                    <p>{player.height}</p>
                  </div>
                  <div>
                    <label>Weight</label>
                    <p>{player.weight}</p>
                  </div>
                </Info.StyledDescriptionRow>
                <Info.StyledDescriptionRow>
                  <div>
                    <label>Age</label>
                    <p>{getAge(player.birthday)}</p>
                  </div>
                </Info.StyledDescriptionRow>
              </Info.StyledDescriptionContainer>
            </Info.StyledMainContainer>
          </div>
        )}
      </Info.StyledContainer>
    </StyledFlex>
  );
};
