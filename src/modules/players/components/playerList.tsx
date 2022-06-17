import React, { useEffect, useState } from "react";
import { actions } from "modules/players/actions";
import { useSelector, useDispatch } from "react-redux";
import { PlayerCard } from "./playerCard";
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
import {
  HeaderFlex,
  StyledFooter,
  StyledGrid,
  StyledHeader,
  StyledMainContainer,
} from "modules/interface/ListComponents";
import Pagination from "common/components/Pagination/Pagination";
import { StyledButton } from "common/components/Button/Button.styled";
import Search from "common/components/Search/Search";
import { StyledMultiSelect } from "common/components/StyledMultiSelect";
import { StyledPaginateContainer } from "common/components/Pagination/StyledPaginate";
import ReactPaginate from "react-paginate";
import { requestTeamOptions, TeamOptionType } from "../helpers/playerHelper";
import { EmptyListScreen } from "modules/interface/EmptyListScreen";

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

  const [teamIds, setTeamIds] = useState<number[] | null>(null);
  const [teamNames, setTeamNames] = useState<TeamOptionType[] | undefined>(
    undefined
  );

  const updatePlayersTeamNames = (
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
  };

  useEffect(() => {
    requestTeamOptions(setTeamNames);
  }, []);

  useEffect(() => {
    requestPlayers();
  }, [filter, teamIds, currentPage, pageSize]);

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

  const updateTeamFilter = (evn: TeamOptionType[]) => {
    if (!evn) setTeamIds(null);
    else {
      let teamRequest: number[] = [];
      evn.map((item) => teamRequest.push(item.value));
      setTeamIds(teamRequest);
    }
  };

  return (
    <StyledMainContainer direction="column">
      <StyledHeader>
        <HeaderFlex>
          <Search onChange={(evt) => updateFilterValue(evt)} />
          <StyledMultiSelect
            classNamePrefix="Select"
            options={teamNames}
            isMulti
            onChange={(e) => updateTeamFilter(e as TeamOptionType[])}
          />
        </HeaderFlex>
        <StyledButton mode="add">Add +</StyledButton>
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
        <PageSizeSelector onChange={handlePageSizeSelectorClick} />
      </StyledFooter>
    </StyledMainContainer>
  );
};


