import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppStateType } from "core/redux/configureStore";
import { StyledFlex, StyledFlexRow } from "common/components/Flex";
import * as Info from "common/components/InfoComponents";
import { EditLink } from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { deleteTeam, getTeam, teamActions } from "../hooks/teamSlice";
import { DeleteButton } from "common/components/Button/deleteButton";
import { teamsActions } from "../hooks/teamsPageSlice";
import debounce from "lodash.debounce";
import { getAge } from "common/helpers/age";
import { useAPIError } from "common/hooks/useApiError";
import { IError } from "common/hooks/apiErrorProvider";

export const TeamInfo: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [teamId, setTeamId] = useState(id ? parseInt(id) : 0);
  const team = useAppSelector((store: AppStateType) => store.team.team);
  const { addError } = useAPIError();
  const navigate = useNavigate();
  const delayedTeamRequest = useCallback(
    debounce(() => {
      dispatch(getTeam(teamId));
    }, 200),
    [id]
  );

  useEffect(() => {
    if (!id) return;
    delayedTeamRequest();
  }, [teamId]);

  const error = useAppSelector((store) => store.team.error);
  useEffect(() => {
    if (error) addError(error);
  }, [error]);

  const handleDeleteClick = (e: any) => {
    if (!id) return;
    const teamId = parseInt(id);
    if (team.players && team.players.length > 0) {
      window.alert("Team has players. Please remove them first");
    } else {
      if (window.confirm("Are you sure?"))
        dispatch(deleteTeam(teamId))
          .then(() => {
            dispatch(teamsActions.clearState());
            dispatch(teamActions.clearState());
            navigate("/teams");
          })
          .catch((reason) => {
            let err = reason as IError;
            if (err.message) addError(err.message);
          });
    }
  };

  return (
    <StyledFlex direction="column">
      <Info.StyledContainer>
        {!team && <div className="noTeam"></div>}
        {team && (
          <div>
            <Info.StyledHeaderContainer>
              <div>
                <StyledLink to="/teams">Teams</StyledLink>
                <span> / </span>
                <span>{team.name}</span>
              </div>
              <Info.StyledHeaderButtonContainer>
                <EditLink to={"/teams/edit/" + id} />
                <DeleteButton onClick={handleDeleteClick} />
              </Info.StyledHeaderButtonContainer>
            </Info.StyledHeaderContainer>
            <Info.StyledMainContainer>
              <Info.StyledLogoContainer
                url={team.imageUrl}
              ></Info.StyledLogoContainer>
              <Info.StyledDescriptionContainer>
                <h2>{team.name}</h2>
                <Info.StyledDescriptionRow>
                  <Info.StyledDescriptionColumn>
                    <div>
                      <label>Year of foundation</label>
                      <p>{team.foundationYear}</p>
                    </div>
                    <div>
                      <label>Conference</label>
                      <p>{team.conference}</p>
                    </div>
                  </Info.StyledDescriptionColumn>
                  <Info.StyledDescriptionColumn>
                    <div>
                      <label>Division</label>
                      <p>{team.division}</p>
                    </div>
                  </Info.StyledDescriptionColumn>
                </Info.StyledDescriptionRow>
              </Info.StyledDescriptionContainer>
            </Info.StyledMainContainer>
          </div>
        )}
      </Info.StyledContainer>

      {team && team.players && team.players.length > 0 && (
        <Info.StyledContainer>
          <Info.StyledTeamListHeader>
            <label>Roster</label>
          </Info.StyledTeamListHeader>
          <Info.StyledTeamListContainer>
            <table>
              <thead>
                <tr>
                  <th className="padding"></th>
                  <th>#</th>
                  <th>Player</th>
                  <th className="hide">Height</th>
                  <th className="hide">Weight</th>
                  <th className="hide">Age</th>
                  <th className="padding"></th>
                </tr>
              </thead>
              <tbody>
                {team.players.map((p, index) => (
                  <tr key={index}>
                    <td className="padding"></td>
                    <td>{p.number}</td>
                    <td>
                      <StyledFlexRow justify="flex-start">
                        <Info.StyledPhotoInList url={p.avatarUrl} />
                        <div className="playerDescription">
                          <label>{p.name}</label>
                          <p>{p.position}</p>
                        </div>
                      </StyledFlexRow>
                    </td>
                    <td className="hide">{p.height}</td>
                    <td className="hide">{p.weight}</td>
                    <td className="hide">{getAge(p.birthday)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Info.StyledTeamListContainer>
        </Info.StyledContainer>
      )}
    </StyledFlex>
  );
};
