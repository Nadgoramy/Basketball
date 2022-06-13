import React, { Component, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TeamDto } from "api/Dto/teamDto";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "core/redux/configureStore";
import { actions } from "modules/teams/teamReducer";
import TeamService from "api/teams/teamService";

type PropTypes = {};
export const TeamInfo: React.FunctionComponent<PropTypes> = (
  props: PropTypes
) => {
  const { search } = useLocation();
  const match = search.match(/id=(.*)/);
  const id: number = match ? parseInt(match[1]) : -1;

  const dispatch = useDispatch();
  let team = useSelector((state: AppStateType) => state.team.team);

  const requestTeam = () => {
    console.log("Id is " + id);
    dispatch(actions.startRequest());
    let promise = TeamService.getTeam(id);
    if (promise)
      promise
        .then((res) => {
          dispatch(actions.gotTeam(res as TeamDto));
        })
        .catch((err) => {
          dispatch(actions.finishRequest());
        });
  };
  useEffect(() => {
    requestTeam();
  }, []);

  return (
    <div className="container">
      {!team && <div className="noteam"></div>}
      {team && (
        <div>
          <div className="containerHeader">
            <span className="headerText">
              <Link to="/teams">Teams</Link>
              <span> / </span>
              <span>{team.name}</span>
            </span>
            <div className="headerbuttons">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
          <div className="mainInfo">
            <div className="logoContainer"></div>
            <div className="main">
              <h2>{team.name}</h2>
              <div>
                <div>
                  <h4>Year of foundation</h4>
                  <h4>{team.foundationYear}</h4>
                </div>
                <div>
                  <h4>Division</h4>
                  <h4>{team.division}</h4>
                </div>
              </div>
              <div>
                <h4>Conference</h4>
                <h4>{team.conference}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
