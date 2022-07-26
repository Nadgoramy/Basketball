import React, { useEffect } from "react";
import { playersActions } from "modules/players/hooks/playersPageSlice";
import { PlayerCard } from "./playerCard";
import { PlayerDto } from "api/Dto/playerDto";
import {
  getCount,
  getCurrentPage,
  getError,
  getFilter,
  getIsFetching,
  getPageSize,
  getPlayers,
  getTeamIds,
  getTeamsOptions,
} from "modules/players/selectors";
import Preloader from "common/components/preloader";
import { Link, useNavigate } from "react-router-dom";
import {  
  StyledFooter,
  StyledGrid,
  StyledGridContainer,
  StyledHeader,
  StyledMainContainer,
} from "modules/interface/ListComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import Search from "common/components/Search/Search";
import { StyledMultiSelect } from "common/components/StyledMultiSelect";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { EmptyListScreen } from "modules/interface/EmptyListScreen";
import {
  OptionTypeValueNumber,
  StyledSelect,
} from "common/components/StyledSelect";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { getTeamOptions } from "../hooks/teamOptionSlice";
import { pageSizeOptions } from "common/helpers/pageSizeOptions";
import { errorActions } from "core/redux/errorSlice";

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
  const error = useAppSelector(getError);

  const teamNames = useAppSelector(getTeamsOptions);
  useEffect(() => {
    dispatch(getTeamOptions())
  }, []);
  
  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error))
  }, [error]);

useEffect(()=>{
  if(teamNames && players)
    dispatch(playersActions.setPlayerTeamName(teamNames))
},[teamNames, players])


  useEffect(() => {
    dispatch(
      playersActions.getPlayersPage({
        filter: filter,
        teamFilter: teamIds,
        page: currentPage,
        pageSize: pageSize,
      })
    );
  }, [filter, teamIds, currentPage, pageSize]);

  const handlePageSizeSelect = (a: any, b: any) => {
    dispatch(playersActions.setPageSize(a.value));
  };
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(playersActions.setFilter(e.target.value));
  };
  const updateCurrentPage = (n: number) => {
    dispatch(playersActions.setPageNumber(n));
  };
  const updateTeamFilter = (evn: OptionTypeValueNumber[]) => {
    if (!evn) dispatch(playersActions.setTeamFilter(null));
    else {
      let teamRequest: number[] = [];
      evn.map((item) => teamRequest.push(item.value));
      dispatch(playersActions.setTeamFilter(teamRequest));
    }
  };

  return (
    <StyledMainContainer direction="column">
      <StyledHeader>        
          <Search onChange={(evt) => updateFilterValue(evt)} value={filter} />
          <StyledMultiSelect
            classNamePrefix="Select"
            options={teamNames}
            isMulti            
            value={teamNames.filter(obj => teamIds.includes(obj.value))} 
            onChange={(e: any) =>
              updateTeamFilter(e as OptionTypeValueNumber[])
            }
          />        
        <StyledButton mode="add" onClick={() => navigate("edit/0")}>
          Add &nbsp;<span id="plus">&nbsp;+</span>
        </StyledButton>
      </StyledHeader>
      {isFetching && <Preloader />}
      {players && players.length == 0 && <EmptyListScreen mode="player" />}
      <StyledGridContainer>
      <StyledGrid>
        {players &&
          players.map((p: PlayerDto) => <PlayerCard player={p} key={p.id} />)}
      </StyledGrid>
      </StyledGridContainer>

      {Math.ceil(itemsCount / pageSize)>0 &&
      <StyledFooter>        
      <div id="footerFlex">
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
              updateCurrentPage(pagination.selected + 1);
            }}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={currentPage - 1}
          />
        </StyledPaginateContainer>
        <StyledSelect
          classNamePrefix="Select"
          className="pagesizeSelector"
          options={pageSizeOptions}
          defaultValue={pageSizeOptions[0]}
          onChange={handlePageSizeSelect}
          menuPlacement="auto"
          value={pageSizeOptions.filter(({ value }) => value === pageSize)}
        />
        </div>
      </StyledFooter>
    }
    </StyledMainContainer>
  );
};
