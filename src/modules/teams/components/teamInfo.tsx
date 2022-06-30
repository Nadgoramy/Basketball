import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppStateType } from "core/redux/configureStore";
import { StyledFlex } from "common/components/Flex";
import * as Info from "modules/interface/InfoComponents";
import { EditLink } from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { deleteTeam, getTeam } from "../hooks/teamSlice";
import { StyledDeleteButton, DeleteButton } from "common/components/Button/deleteButton";
import { errorActions } from "core/redux/errorSlice";
import ErrorPopUp from "common/components/ErrorPopUp";

type PropTypes = {};
export const TeamInfo: React.FunctionComponent<PropTypes> = (
  props: PropTypes
) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  let team = useAppSelector((state: AppStateType) => state.team.team);

  useEffect(() => {
    if (!id) return;
    let teamId = parseInt(id);
    requestTeam(teamId);
  }, [id]);

  const error = useAppSelector((store) => store.team.error);
  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error));
  }, [error]);

  const requestTeam = (teamId: number) => {
    dispatch(getTeam(teamId));
  };

  const getAge = (birthday: Date | undefined) => {
    if (!birthday) return "";
    let age = new Date(Date.now() - new Date(birthday).getTime());
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const handleDeleteClick = (e: any) => {
    if (!id) return;
    let teamId = parseInt(id);
    if (window.confirm("Are you sure?")) dispatch(deleteTeam(teamId));
  };
  const navigate = useNavigate()
  const operationSecceded = useAppSelector((state: AppStateType) => state.team.operationSucceded);
  useEffect(()=>{
    if(operationSecceded) navigate("/teams");
  },[operationSecceded])
  
  return (
    <StyledFlex direction="column">
      <Info.StyledContainer>
        {!team && <div className="noTeam"></div>}
        {team && (
          <div>
            <Info.StyledHeaderContainer>
              <span className="headerText">
                <StyledLink to="/teams">Teams</StyledLink>
                <span> / </span>
                <span>{team.name}</span>
              </span>
              <StyledFlex>
                <EditLink to={"/teams/edit/" + id} />
                <DeleteButton onClick={handleDeleteClick} />
              </StyledFlex>
            </Info.StyledHeaderContainer>
            <Info.StyledMainContainer>
              <Info.StyledLogoContainer
                url={team.imageUrl}
              ></Info.StyledLogoContainer>
              <Info.StyledDescriptionContainer>
                <h2>{team.name}</h2>
                <Info.StyledDescriptionRow>
                  <div>
                    <label>Year of foundation</label>
                    <p>{team.foundationYear}</p>
                  </div>
                  <div>
                    <label>Division</label>
                    <p>{team.division}</p>
                  </div>
                </Info.StyledDescriptionRow>
                <Info.StyledDescriptionRow>
                  <div>
                    <label>Conference</label>
                    <p>{team.conference}</p>
                  </div>
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
                  <th>#</th>
                  <th>Player</th>
                  <th className="hide">Height</th>
                  <th className="hide">Weight</th>
                  <th className="hide">Age</th>
                </tr>
              </thead>
              <tbody>
                {team.players.map((p, index) => (
                  <tr key={index}>
                    <td>{p.number}</td>
                    <td>
                      <StyledFlex direction="row">
                        <Info.StyledPhotoInList
                          url={p.avatarUrl}
                        ></Info.StyledPhotoInList>
                        <StyledFlex direction="column">
                          <label>{p.name}</label>
                          <span>{p.position}</span>
                        </StyledFlex>
                      </StyledFlex>
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
