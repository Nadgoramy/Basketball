import React, { useCallback, useEffect, useState } from "react";
import * as selectors from "modules/teams/selectors";
import { Preloader } from "common/components/preloader";
import { TeamDto } from "api/Dto/teamDto";
import { TeamCard } from "modules/teams/components/teamCard";
import { Search } from "common/components/Search/Search";
import { StyledButton } from "common/components/Button/Button.styled";
import {
  StyledFooter,
  StyledGridContainer,
  StyledHeader,
  StyledMainContainer,
  StyledTeamGrid,
} from "common/components/ListComponents";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { IParams, teamsActions } from "../hooks/teamsPageSlice";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { EmptyList } from "common/components/EmptyList";
import debounce from "lodash.debounce";
import arrowLeft from "asserts/icons/chevron_left.svg";
import arrowRight from "asserts/icons/chevron_right.svg";
import { useAPIError } from "common/hooks/useApiError";
import { shallowEqual } from "react-redux";
import PageSizeSelector from "common/components/PageSizeSelector/PageSizeSelector";

type PropsType = {};
export const TeamsList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pageParams = useAppSelector(selectors.getTeamsPageParams, shallowEqual);
  const teams = useAppSelector(selectors.getTeams);
  const isFetching = useAppSelector(selectors.getIsFetchingTeams);
  const itemsCount = useAppSelector(selectors.getTeamsCount);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const error = useAppSelector(selectors.getTeamsError);
  const { addError } = useAPIError();
  useEffect(() => {
    if (error) addError(error);
  }, [error]);

  const updatePage = (pageParams: IParams) => {
    setRequestCompleted(false);
    dispatch(
      teamsActions.getTeamsPage({
        filter: pageParams.filter,
        page: pageParams.page,
        pageSize: pageParams.pageSize,
      })
    )
      .then(() => setRequestCompleted(true))
      .catch(() => setRequestCompleted(true));
  };

  const delayedUpdatePage = useCallback(debounce(updatePage, 300), []);
  useEffect(() => {
    delayedUpdatePage(pageParams);
  }, [pageParams]);
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(teamsActions.setFilter(e.target.value));
  };
  const updateCurrentPage = (n: number) => {
    dispatch(teamsActions.setPageNumber(n));
  };
  const handlePageSizeSelect = (a: any, b: any) => {
    dispatch(teamsActions.setPageSize(a.value));
  };

  return (
    <StyledMainContainer direction="column">
      <StyledHeader>
        <Search
          onChange={(evt) => updateFilterValue(evt)}
          value={pageParams.filter}
        />
        <StyledButton mode="add" onClick={() => navigate("edit/0")}>
          Add &nbsp;<span id="plus">&nbsp;+</span>
        </StyledButton>
      </StyledHeader>
      {isFetching && <Preloader />}
      {requestCompleted && (!teams || teams.length == 0) && (
        <EmptyList mode="team" />
      )}

      <StyledGridContainer>
        <StyledTeamGrid>
          {requestCompleted &&
            teams &&
            teams.length > 0 &&
            teams.map((p: TeamDto) => <TeamCard team={p} key={p.id} />)}
        </StyledTeamGrid>
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
