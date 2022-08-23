import React, { useCallback, useEffect } from "react";
import {
  playersActions,
  IParams,
} from "modules/players/hooks/playersPageSlice";
import { PlayerCard } from "./playerCard";
import { PlayerDto } from "api/Dto/playerDto";
import {
  getCount,
  getError,
  getIsFetching,
  getPlayers,
  getPlayersPageParams,
  getTeamsOptions,
  getFilter,
} from "modules/players/selectors";
import Preloader from "common/components/preloader";
import { useNavigate } from "react-router-dom";
import {
  StyledFooter,
  StyledGrid,
  StyledGridContainer,
  StyledHeader,
  StyledMainContainer,
} from "common/components/ListComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import Search from "common/components/Search/Search";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { EmptyList } from "common/components/EmptyList";
import { StyledSelect } from "common/components/StyledSelect";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { getTeamOptions } from "../hooks/teamOptionSlice";
import { pageSizeOptions } from "common/helpers/pageSizeOptions";
import { errorActions } from "core/redux/errorSlice";
import { PlayerTeamFilter } from "modules/players/components/playerTeamFilter";
import debounce from "lodash.debounce";
import arrowLeft from "asserts/icons/chevron_left.svg";
import arrowRight from "asserts/icons/chevron_right.svg";

type PropsType = {};
export const PlayerList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pageParams = useAppSelector(getPlayersPageParams);
  const players = useAppSelector(getPlayers);
  const isFetching = useAppSelector(getIsFetching);
  const itemsCount = useAppSelector(getCount);
  const error = useAppSelector(getError);
  const filter = useAppSelector(getFilter);

  const teamNames = useAppSelector(getTeamsOptions);
  useEffect(() => {
    dispatch(getTeamOptions());
    dispatch(playersActions.clearState());
  }, []);

  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error));
  }, [error]);

  useEffect(() => {
    if (teamNames && players)
      dispatch(playersActions.setPlayerTeamName(teamNames));
  }, [teamNames, players]);

  const updatePage = (pageParams: IParams) => {
    dispatch(
      playersActions.getPlayersPage({
        filter: pageParams.filter,
        teamFilter: pageParams.teamFilter,
        page: pageParams.page,
        pageSize: pageParams.pageSize,
      })
    );
  };
  const delayedUpdatePage = useCallback(debounce(updatePage, 300), []);
  useEffect(() => {
    delayedUpdatePage(pageParams);
  }, [pageParams]);

  const handlePageSizeSelect = (a: any, b: any) => {
    dispatch(playersActions.setPageSize(a.value));
  };
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(playersActions.setFilter(e.target.value));
    //setSearchTxt(e.target.value);
  };
  const updateCurrentPage = (n: number) => {
    dispatch(playersActions.setPageNumber(n));
  };

  return (
    <StyledMainContainer direction="column">
      <StyledHeader>
        <Search
          onChange={(evt) => updateFilterValue(evt)}
          value={pageParams.filter}
        />
        <PlayerTeamFilter />
        <StyledButton mode="add" onClick={() => navigate("edit/0")}>
          Add &nbsp;<span id="plus">&nbsp;+</span>
        </StyledButton>
      </StyledHeader>
      {isFetching && <Preloader />}
      {players && players.length == 0 && <EmptyList mode="player" />}
      <StyledGridContainer>
        <StyledGrid>
          {players &&
            players.map((p: PlayerDto) => <PlayerCard player={p} key={p.id} />)}
        </StyledGrid>
      </StyledGridContainer>

      {Math.ceil(itemsCount / pageParams.pageSize) > 0 && (
        <StyledFooter>
          <div id="footerFlex">
            <StyledPaginateContainer>
              <ReactPaginate
                previousLabel={<img src={arrowRight} />}
                nextLabel={<img src={arrowLeft} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={Math.ceil(itemsCount / pageParams.pageSize)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={(pagination: any) => {
                  updateCurrentPage(pagination.selected + 1);
                }}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={pageParams.page - 1}
              />
            </StyledPaginateContainer>
            <StyledSelect
              classNamePrefix="Select"
              className="pagesizeSelector"
              options={pageSizeOptions}
              defaultValue={pageSizeOptions[0]}
              onChange={handlePageSizeSelect}
              menuPlacement="auto"
              value={pageSizeOptions.filter(
                ({ value }) => value === pageParams.pageSize
              )}
            />
          </div>
        </StyledFooter>
      )}
    </StyledMainContainer>
  );
};
