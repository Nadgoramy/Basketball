import React, { useCallback, useEffect } from "react";
import * as selectors from "modules/teams/selectors";
import Preloader from "common/components/preloader";
import { TeamDto } from "api/Dto/teamDto";
import { TeamCard } from "modules/teams/components/teamCard";
import Search from "common/components/Search/Search";
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
import { StyledSelect } from "common/components/StyledSelect";
import { pageSizeOptions } from "common/helpers/pageSizeOptions";
import { errorActions } from "core/redux/errorSlice";
import debounce from "lodash.debounce";
import arrowLeft from "asserts/icons/chevron_left.svg";
import arrowRight from "asserts/icons/chevron_right.svg";

type PropsType = {};
export const TeamsList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pageParams = useAppSelector(selectors.getTeamsPageParams);
  const teams = useAppSelector(selectors.getTeams);
  const isFetching = useAppSelector(selectors.getIsFetching);
  const itemsCount = useAppSelector(selectors.getCount);
  const error = useAppSelector(selectors.getError);

  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error));
  }, [error]);

  useEffect(() => {
    delayedUpdatePage(pageParams);
  }, [pageParams]);
  const updatePage = (pageParams: IParams) => {
    dispatch(
      teamsActions.getTeamsPage({
        filter: pageParams.filter,
        page: pageParams.page,
        pageSize: pageParams.pageSize,
      })
    );
  };
  const delayedUpdatePage = useCallback(debounce(updatePage, 300), []);
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
      {!teams || teams.length == 0 ? (
        <EmptyList mode="team" />
      ) : (
        <StyledGridContainer>
          <StyledTeamGrid>
            {teams &&
              teams.map((p: TeamDto) => <TeamCard team={p} key={p.id} />)}
          </StyledTeamGrid>
        </StyledGridContainer>
      )}

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
