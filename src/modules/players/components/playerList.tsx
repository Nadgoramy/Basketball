import React, { useEffect, useState } from "react";
import { actions } from "modules/players/actions";
import { playersActions } from "modules/players/hooks/playersPageSlice"
import { PlayerCard } from "./playerCard";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import {
  getCount,
  getCurrentPage,
  getFilter,
  getIsFetching,
  getPageSize,
  getPlayers,
  getTeamIds
} from "modules/players/selectors";
import Preloader from "common/components/preloader";
import { Link, useNavigate } from "react-router-dom";
import {
  HeaderFlex,
  StyledFooter,
  StyledGrid,
  StyledHeader,
  StyledMainContainer,
} from "modules/interface/ListComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import Search from "common/components/Search/Search";
import { StyledMultiSelect } from "common/components/StyledMultiSelect";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { OptionType, requestTeamOptions } from "../helpers/playerHelper";
import { EmptyListScreen } from "modules/interface/EmptyListScreen";
import { StyledSelect } from "common/components/StyledSelect";
import {useAppDispatch, useAppSelector} from "core/redux/store"
import { getTeamOptions } from "../hooks/teamOptionSlice";

type PropsType = {};
export const PlayerList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const players = useAppSelector(getPlayers);
  const currentPage = useAppSelector(getCurrentPage);
  const filter = useAppSelector(getFilter);
  const pageSize = useAppSelector(getPageSize);
  const isFetching = useAppSelector(getIsFetching);
  const itemsCount = useAppSelector(getCount);
  const teamIds = useAppSelector(getTeamIds);

  const [teamNames, setTeamNames] = useState<OptionType[] | undefined>(
    undefined
  );
  

   /*const updatePlayersTeamNames = (
    list: PlayerDtoPageResult
  ): PlayerDtoPageResult => {
    if (!teamNames) return list;
    list.data.forEach((element) => {
      element.teamName = teamNames.find((t) => t.value == element.team)?.label;
    });
    return list;
  };

 const requestPlayers = () => {
    dispatch(actions.startRequest());
    let promise = PlayerService.getPlayers(
      filter,
      teamIds,
      currentPage,
      pageSize
    );
    if (promise)
      promise
        .then((res) => {
          dispatch(
            actions.gotPlayers(
              updatePlayersTeamNames(res as PlayerDtoPageResult)
            )
          );
        })
        .catch((err) => {
          dispatch(actions.finishRequest());
        });
  };*/

  /*useEffect(() => {
    //requestTeamOptions(setTeamNames);
    dispatch(getTeamOptions)
  }, []);
*/
  useEffect(() => {
    dispatch(playersActions.getPlayersPage({filter: filter,
      teamIds: teamIds,   page: currentPage, pageSize: pageSize}))
  }, [filter, teamIds, currentPage, pageSize]);

  
  const handlePageSizeSelect = (a: any, b: any ) => {
    dispatch(playersActions.setPageSize(a.value));
  };
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(playersActions.setFilter(e.target.value));
  };
  const updateCurrentPage = (n: number) => {
    dispatch(playersActions.setPageNumber(n));
  };
  const updateTeamFilter = (evn: OptionType[]) => {
    if (!evn) dispatch(playersActions.setTeamFilter(null))
    else {
      let teamRequest: number[] = [];
      evn.map((item) => teamRequest.push(item.value));
      dispatch(playersActions.setTeamFilter(teamRequest))
    }
  };

  const pageSizeOptions=[
    {
      label:"6",
      value:6 
    },
    {
      label:"12",
      value: 12
    },
    {
      label:"24",
      value: 24
    }
  ]
  return (
    <StyledMainContainer direction="column">
      <StyledHeader>
        <HeaderFlex>
          <Search onChange={(evt) => updateFilterValue(evt)} />
          <StyledMultiSelect
            classNamePrefix="Select"
            options={teamNames}
            isMulti
            onChange={(e: any) => updateTeamFilter(e as OptionType[])}
          />
        </HeaderFlex>
        <StyledButton mode="add" onClick={()=>navigate("edit/0")}>Add +</StyledButton>
      </StyledHeader>
      {isFetching && <Preloader />}
      {players && players.length == 0 && <EmptyListScreen mode="player"/>}
      <StyledGrid>
        {players &&
          players.map((p: PlayerDto) => <PlayerCard player={p} key={p.id} />)}
      </StyledGrid>
      <StyledFooter>
        <StyledPaginateContainer>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={Math.ceil(itemsCount / pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(pagination: any) => {
              console.log(pagination);
              updateCurrentPage(pagination.selected+1)
            }}
            containerClassName="pagination"
            activeClassName="active"
          />
        </StyledPaginateContainer>
        <StyledSelect            
            classNamePrefix="Select"
            options={pageSizeOptions}     
            defaultValue={pageSizeOptions[0]}                
            onChange={handlePageSizeSelect}
            menuPlacement="auto"
            value={pageSizeOptions.filter(({value}) => value === pageSize)}
          />
      </StyledFooter>
    </StyledMainContainer>
  );
};


