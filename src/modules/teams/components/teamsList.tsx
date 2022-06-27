import React, { useEffect } from "react";
import { actions } from "modules/teams/actions";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/teams/selectors";
import Preloader from "common/components/preloader";
import PageSizeSelector from "common/components/PageSizeSelector/PageSizeSelector";
import { TeamDto, TeamDtoPageResult } from "api/Dto/teamDto";
import { TeamCard } from "modules/teams/components/teamCard";
import TeamService from "api/teams/teamService";
import Search from "common/components/Search/Search";
import { StyledButton } from "common/components/Button/Button.styled"
import { StyledFooter, StyledGrid, StyledHeader, StyledMainContainer } from "modules/interface/ListComponents";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";



type PropsType = {};
export const TeamsList: React.FunctionComponent<PropsType> = (
  props: PropsType
) => {
  const dispatch = useDispatch();
  const teams = useSelector(selectors.getTeams);
  const currentPage = useSelector(selectors.getCurrentPage);
  const filter = useSelector(selectors.getFilter);
  const pageSize = useSelector(selectors.getPageSize);
  const isFetching = useSelector(selectors.getIsFetching);
  const itemsCount = useSelector(selectors.getCount);
  const navigate = useNavigate();

  const requestTeams = () => {
    dispatch(actions.startRequest());
    let promise = TeamService.getTeams(filter, currentPage, pageSize);
    if (promise)
      promise
        .then((res) => {
          dispatch(actions.gotTeams(res as TeamDtoPageResult));
          console.log(res);
        })
        .catch((err) => {
          dispatch(actions.finishRequest());
        });
  };

  useEffect(() => {
    requestTeams();
  }, [filter, currentPage, pageSize]);

  const handlePageSizeSelectorClick = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(actions.setPageSize(parseInt(event.target.value)));
  };
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setTeamsFilter(e.target.value));
  };
  const updateCurrentPage = (n: number) => {
    dispatch(actions.setCurrentPage(n));
  };

  return (
    <StyledMainContainer direction="column">
      <StyledHeader>
        <Search onChange={(evt) => updateFilterValue(evt)} />
        <StyledButton mode="add" onClick={()=>navigate("edit/0")}>Add +</StyledButton>
      </StyledHeader>
      {isFetching && <Preloader />}
      <StyledGrid>
        {!teams && <div className="emptyList"></div>}
        {teams && teams.map((p: TeamDto) => <TeamCard team={p} key={p.id} />)}
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
        <PageSizeSelector onChange={handlePageSizeSelectorClick} />
      </StyledFooter>
    </StyledMainContainer>
  );
};

