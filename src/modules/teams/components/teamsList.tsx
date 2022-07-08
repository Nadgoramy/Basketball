import React, { useEffect } from "react";
import * as selectors from "modules/teams/selectors";
import Preloader from "common/components/preloader";
import { TeamDto } from "api/Dto/teamDto";
import { TeamCard } from "modules/teams/components/teamCard";
import Search from "common/components/Search/Search";
import { StyledButton } from "common/components/Button/Button.styled";
import {
  StyledFooter,
  StyledGrid,
  StyledGridContainer,
  StyledHeader,
  StyledMainContainer,
  StyledTeamGrid,
} from "modules/interface/ListComponents";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { teamsActions } from "../hooks/teamsPageSlice";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { EmptyListScreen } from "modules/interface/EmptyListScreen";
import { StyledSelect } from "common/components/StyledSelect";
import { pageSizeOptions } from "common/helpers/pageSizeOptions";

type PropsType = {};
export const TeamsList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(selectors.getTeams);
  const currentPage: number = useAppSelector(selectors.getCurrentPage);
  const filter = useAppSelector(selectors.getFilter);
  const pageSize = useAppSelector(selectors.getPageSize);
  const isFetching = useAppSelector(selectors.getIsFetching);
  const itemsCount = useAppSelector(selectors.getCount);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(teamsActions.setFilter(""));
  }, []);

  useEffect(() => {
    dispatch(
      teamsActions.getTeamsPage({
        filter: filter,
        page: currentPage,
        pageSize: pageSize,
      })
    );
  }, [filter, currentPage, pageSize]);

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
        <Search onChange={(evt) => updateFilterValue(evt)} />
        <StyledButton mode="add" onClick={() => navigate("edit/0")}>
          Add &nbsp;<span id="plus">&nbsp;+</span>
        </StyledButton>
      </StyledHeader>
      {!teams || teams.length == 0 ? (
        <EmptyListScreen mode="team" />
      ) : (
        <StyledGridContainer>
          <StyledTeamGrid>
            {isFetching && <Preloader />}
            {teams &&
              teams.map((p: TeamDto) => <TeamCard team={p} key={p.id} />)}
          </StyledTeamGrid>
        </StyledGridContainer>
      )}
      <StyledFooter>
        <div id="footerFlex">
          <StyledPaginateContainer>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={Math.ceil(itemsCount / pageSize)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={(pagination: any) => {
                console.log(pagination);
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
    </StyledMainContainer>
  );
};
