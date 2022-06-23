import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { TeamDto } from "api/Dto/teamDto";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "core/redux/configureStore";
import { actions } from "modules/teams/teamReducer";
import TeamService from "api/teams/teamService";
import { StyledFlex } from "common/components/Flex";
import * as Info from "modules/interface/InfoComponents";
import PlayerService from "api/players/playerService";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import { DeleteLink, EditLink } from "common/components/Link/editLink";
import { StyledLink } from "common/components/Link/styledLink";

type PropTypes = {};
export const TeamInfo: React.FunctionComponent<PropTypes> = (
  props: PropTypes
) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  let team = useSelector((state: AppStateType) => state.team.team);

  useEffect(() => {
    if (!id) return;
    let playerId = parseInt(id);
    requestTeam(playerId);
  }, [id]);

  const requestTeam = (teamId: number) => {
    dispatch(actions.startRequest());
    console.log(teamId);
    let promise = TeamService.getTeam(teamId);
    if (promise)
      promise
        .then((res) => {
          let team = res as TeamDto;
          dispatch(actions.setTeam(team));
          PlayerService.getPlayers("", [teamId], 1, 100)?.then((responce) => {
            team.players = (responce as PlayerDtoPageResult).data;
            dispatch(actions.setTeam(team));
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => dispatch(actions.finishRequest()));
  };

  const getAge = (birthday: Date | undefined) => {
    if (!birthday) return "";
    let age = new Date(Date.now() - new Date(birthday).getTime());
    return Math.abs(age.getUTCFullYear() - 1970);
  };
  
  const handleDeleteClick = (e: any) =>{

  }

  return (
    <StyledFlex direction="column">
      <Info.StyledContainer>
        {!team && <div className="noPlayer"></div>}
        {team && (
          <div>
            <Info.StyledHeaderContainer>
              <span className="headerText">
              <StyledLink to="/teams">Teams</StyledLink>
                <span> / </span>
                <span>{team.name}</span>
              </span>
              <StyledFlex >              
                <EditLink to={"/teams/edit/"+id}/>
                <DeleteLink onClick={handleDeleteClick} to="#0"/>
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

      {team && team.players && team.players.length>0 && (
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
                        <Info.StyledPhotoInList url={p.avatarUrl}></Info.StyledPhotoInList>                        
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
