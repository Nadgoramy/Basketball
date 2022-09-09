import { StyledFlex } from "common/components/Flex";
import { AppStateType } from "core/redux/configureStore";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Info from "common/components/InfoComponents";
import { EditLink } from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";
import { getPlayer, deletePlayer } from "../hooks/playerSlice";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { DeleteButton } from "common/components/Button/deleteButton";
import { getAge } from "common/helpers/age";
import { useAPIError } from "common/hooks/useApiError";

type PlayerInfoPtopType = React.HTMLAttributes<HTMLElement> & {};

export const PlayerInfo: React.FunctionComponent<PlayerInfoPtopType> = (
  props: PlayerInfoPtopType
) => {
  const dispatch = useAppDispatch();
  const player = useAppSelector((store: AppStateType) => store.player.player);
  const { addError } = useAPIError();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const playerId = parseInt(id);
    dispatch(getPlayer(playerId));
  }, [id]);

  const error = useAppSelector((store: AppStateType) => store.player.error);
  useEffect(() => {
    if (error) addError(error);
  }, [error]);

  const playerAge = useMemo(() => getAge(player.birthday), [player.birthday]);

  const handleDeleteClick = (e: any) => {
    if (!id) return;
    const playerId = parseInt(id);
    if (window.confirm("Are you sure?")) {
      dispatch(deletePlayer(playerId)).then(() => {
        navigate("/players");
      });
    }
  };

  return (
    <StyledFlex>
      <Info.StyledContainer>
        {!player && <div className="noPlayer">No player found</div>}
        {player && (
          <div>
            <Info.StyledHeaderContainer>
              <div>
                <StyledLink to="/players">Players</StyledLink>
                <span> / </span>
                <span>{player.name}</span>
              </div>
              <Info.StyledHeaderButtonContainer>
                <EditLink to={"/players/edit/" + id} />
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
                    <p>{playerAge}</p>
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
