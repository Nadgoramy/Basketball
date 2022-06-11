import React, { useEffect, useState } from "react";
import { AppStateType } from "core/redux/configureStore";
import { actions, setCurrentPage } from "modules/players/actions";
import {actions as teamActions} from "modules/teams/actions"
import { useSelector, useDispatch } from "react-redux";
import PlayerCard from "./playerCard";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import {
  getCount,
  getCurrentPage,
  getFilter,
  getIsFetching,
  getPageSize,
  getPlayers,
} from "modules/players/selectors";
import Preloader from "common/components/preloader";
import PlayerService from "api/players/playerService";
import { Link } from "react-router-dom";
import PageSizeSelector from "common/components/PageSizeSelector/PageSizeSelector";
import Select from "react-select";
import { StyledFlex } from "common/components/Flex";
import { StyledFooter, StyledHeader } from "modules/interface/ListComponents";
import Pagination from "common/components/Pagination/Pagination";
import TeamService from "api/teams/teamService";
import { TeamDto, TeamDtoPageResult } from "api/Dto/teamDto";

type PropsType = {};
export const PlayerList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getFilter);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);
  const itemsCount = useSelector(getCount);

  const [teamNames, setTeamNames] = useState<TeamNameType[] | undefined>(undefined);
interface TeamNameType{
  teamName:string;
  id: number;
}

  const requestPlayers = () => {
    dispatch(actions.startRequest());
    let promise = PlayerService.getPlayers(filter, currentPage, pageSize);
    if (promise)
      promise
        .then((res) => {
          dispatch(actions.gotPlayers(res as PlayerDtoPageResult));
        })
        .catch((err) => {
          dispatch(actions.finishRequest());
        });
  };

  const getTeamNames =(totalCount: number)=>{
    let promise = TeamService.getTeams("", 1, totalCount);
    if (promise)
      promise
        .then((res) => {          
          let names = new Array<TeamNameType>();
          (res as TeamDtoPageResult).data.map((t: TeamDto) => names.push({teamName: t.name, id:  t.id}));
          setTeamNames(names);
        })
        .catch((err) => {
          console.log("err")
        });
  }
  const requestTeams = () => {
    let promise = TeamService.getTeams("", 1, 1);
    if (promise)
      promise
        .then((res) => {          
          getTeamNames((res as TeamDtoPageResult).count)
        })
        .catch((err) => {
          console.log("err")
        });
  };
  useEffect(() => {    
    requestTeams();
  }, []);

  useEffect(() => {
    requestPlayers();
  }, [filter, currentPage, pageSize]);

  const handlePageSizeSelectorClick = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(actions.setPageSize(parseInt(event.target.value)));
  };
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setPlayersFilter(e.target.value));
  };
  const updateCurrentPage = (n: number) => {
    dispatch(actions.setCurrentPage(n));
  };

  const updateTeamFilter = (n: number) => {
    
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <StyledFlex direction="column">
      <StyledHeader>
        <input type="text" onChange={(evt) => updateFilterValue(evt)}></input>
        
        <select>
          <option>AAA</option>
          <option>BBB</option>
        </select>
        <Link to="/players/0">Add</Link>
      </StyledHeader>
      {isFetching && <Preloader />}
      {players &&
        players.map((p: PlayerDto) => <PlayerCard player={p} key={p.id} />)}
      <StyledFooter>
        <Pagination
          onPageChange={updateCurrentPage}
          totalCount={Math.ceil(itemsCount / pageSize)}
          currentPage={1}
        />
        <PageSizeSelector onChange={handlePageSizeSelectorClick} />
      </StyledFooter>
    </StyledFlex>
  );
};

/*
<Select
          options={teamNames}
          value={teamNames[0].id}
          placeholder={""}
          onChange={(e) => {
            updateTeamFilter(e.)
          }}
        />
*/