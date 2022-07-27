import { StyledFlex } from "common/components/Flex";
import { AppStateType } from "core/redux/configureStore";
import { useEffect } from "react";
import {
  useNavigate,
  useParams,  
} from "react-router-dom";
import * as Info from "modules/interface/InfoComponents"
import { EditLink} from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";
import { getPlayer, deletePlayer } from "../hooks/playerSlice";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { DeleteButton } from "common/components/Button/deleteButton";
import { errorActions } from "core/redux/errorSlice";
import { playersActions } from "../hooks/playersPageSlice";

type PlayerInfoPtopType = React.HTMLAttributes<HTMLElement> & {};

export const PlayerInfo: React.FunctionComponent<PlayerInfoPtopType> = (
  props: PlayerInfoPtopType
) => {
  const dispatch = useAppDispatch();
  const player = useAppSelector((store: AppStateType) => store.player.player);
  const deleteOperationSucceded = useAppSelector((store: AppStateType)=> store.player.deleteSucceded)
  const params = useParams();
  let { id } = useParams();

  useEffect(() => {
    if (!id) return;
    let playerId = parseInt(id);
    dispatch(getPlayer(playerId));
  }, [id]);

  const error = useAppSelector((store) => store.player.error);
  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error));    
  }, [error]);

  useEffect(()=>{
    if(deleteOperationSucceded){
      dispatch(playersActions.clearState());
      navigate(-1);
    }
  },[deleteOperationSucceded])

  let navigate = useNavigate();
  const routeChange = (id: number) => {
    let path = `/editplayer/` + id;
    navigate(path);
  };  

  const getAge = (birthday: Date | undefined) => {
    if (!birthday) return "";
    let age = new Date(Date.now() - birthday.valueOf());
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const handleDeleteClick = (e: any) =>{
    if (!id) return;
    let playerId = parseInt(id);
    dispatch(deletePlayer(playerId));    
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
              <Info.StyledHeaderButtonContainer>              
                <EditLink to={"/players/edit/"+id}/>
                <DeleteButton onClick={handleDeleteClick} />
              </Info.StyledHeaderButtonContainer>
            </Info.StyledHeaderContainer>
            <Info.StyledMainContainer>
              <Info.StyledPhotoContainer url={player.avatarUrl} />                
              <Info.StyledDescriptionContainerPlayer>
                <h2>
                  {player.name} <span>&nbsp;#{player.number}</span>
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
                    <p>{player.height} cm</p>
                  </div>
                  <div>
                    <label>Weight</label>
                    <p>{player.weight} kg</p>
                  </div>
                </Info.StyledDescriptionRow>
                <Info.StyledDescriptionRow>
                  <div>
                    <label>Age</label>
                    <p>{getAge(player.birthday)}</p>
                  </div>
                </Info.StyledDescriptionRow>
              </Info.StyledDescriptionContainerPlayer>
            </Info.StyledMainContainer>
          </div>
        )}
      </Info.StyledContainer>
    </StyledFlex>
  );
};
