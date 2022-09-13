import React, { useCallback, useEffect, useState } from "react";
import {
  playersActions,
  IParams,
} from "modules/players/hooks/playersPageSlice";
import { PlayerCard } from "./playerCard";
import { PlayerDto } from "api/Dto/playerDto";
import * as selectors from "modules/players/selectors";
import { Preloader } from "common/components/preloader";
import { useNavigate } from "react-router-dom";
import {
  StyledFooter,
  StyledGrid,
  StyledGridContainer,
  StyledHeader,
  StyledMainContainer,
} from "common/components/ListComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import { Search } from "common/components/Search/Search";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { EmptyList } from "common/components/EmptyList";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { getTeamOptions } from "../hooks/teamListSlice";
import { PlayerTeamFilter } from "modules/players/components/playerTeamFilter";
import debounce from "lodash.debounce";
import arrowLeft from "asserts/icons/chevron_left.svg";
import arrowRight from "asserts/icons/chevron_right.svg";
import { useAPIError } from "common/hooks/useApiError";
import { shallowEqual } from "react-redux";
import PageSizeSelector from "common/components/PageSizeSelector/PageSizeSelector";

export const PlayerList: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pageParams = useAppSelector(
    selectors.getPlayersPageParams,
    shallowEqual
  );
  const players = useAppSelector(selectors.getPlayers);
  const isFetching = useAppSelector(selectors.getIsFetchingtPlayers);
  const itemsCount = useAppSelector(selectors.getCount);
  const error = useAppSelector(selectors.getError);
  const { addError } = useAPIError();
  const [requestCompleted, setRequestCompleted] = useState(false);

  const teamNames = useAppSelector(selectors.getTeamList);
  useEffect(() => {
    dispatch(getTeamOptions());
    dispatch(playersActions.clearState());
  }, []);

  useEffect(() => {
    if (error) addError(error);
  }, [error]);

  useEffect(() => {
    if (teamNames && players)
      dispatch(playersActions.setPlayerTeamName(teamNames));
  }, [teamNames, players]);

  const updatePage = (pageParams: IParams) => {
    setRequestCompleted(false);
    dispatch(
      playersActions.getPlayersPage({
        filter: pageParams.filter,
        teamFilter: pageParams.teamFilter,
        page: pageParams.page,
        pageSize: pageParams.pageSize,
      })
    )
      .then(() => setRequestCompleted(true))
      .catch(() => {
        setRequestCompleted(true);
      });
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
      {requestCompleted && (!players || players.length === 0) && (
        <EmptyList mode="player" />
      )}

      <StyledGridContainer>
        <StyledGrid>
          {requestCompleted &&
            players &&
            players.length > 0 &&
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
            <PageSizeSelector value={pageParams.pageSize} onChange={handlePageSizeSelect} />
          </div>
        </StyledFooter>
      )}
    </StyledMainContainer>
  );
};