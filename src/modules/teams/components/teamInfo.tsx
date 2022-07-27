import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppStateType } from "core/redux/configureStore";
import { StyledFlex, StyledFlexRow } from "common/components/Flex";
import * as Info from "modules/interface/InfoComponents";
import { EditLink } from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { deleteTeam, getTeam } from "../hooks/teamSlice";
import { DeleteButton } from "common/components/Button/deleteButton";
import { errorActions } from "core/redux/errorSlice";
import { teamsActions } from "../hooks/teamsPageSlice";

type PropTypes = {};
export const TeamInfo: React.FunctionComponent<PropTypes> = (
  props: PropTypes
) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  let team = useAppSelector((store: AppStateType) => store.team.team);
  const deleteOperationSucceded = useAppSelector((store:AppStateType)=>store.team.deleteSucceded);
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return;
    let teamId = parseInt(id);
    requestTeam(teamId);
  }, [id]);

  const error = useAppSelector((store) => store.team.error);
  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error));
  }, [error]);

  useEffect(()=>{
    if(deleteOperationSucceded){
      dispatch(teamsActions.clearState());
      navigate(-1);
    }
  },[deleteOperationSucceded])


  const requestTeam = (teamId: number) => {
    dispatch(getTeam(teamId));
  };

  const getAge = (birthday: Date | undefined): string => {
    if (birthday === undefined) return "";
    let age = new Date(Date.now() - birthday.valueOf());
    return Math.abs(age.getUTCFullYear() - 1970).toString();
  };

  const handleDeleteClick = (e: any) => {
    if (!id) return;
    let teamId = parseInt(id);
    if(team.players.length>0){window.alert("Team has players. Please remove them first")}
    else {
      if (window.confirm("Are you sure?")) dispatch(deleteTeam(teamId));
    }
  };
   
  
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
