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
import { OptionType, requestTeamOptions } from "../helpers/playerHelper";
import { EmptyListScreen } from "modules/interface/EmptyListScreen";
import { StyledSelect } from "common/components/StyledSelect";
import { DefaultTheme } from "DefaultTheme";

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
  const [teamNames, setTeamNames] = useState<OptionType[] | undefined>(
    undefined
  );

function customStyle(theme: DefaultTheme){
  return{
    ...theme,
    colors:{
      ...theme.colors,
      primary25: 'red',
      primary: 'white'
    },
    menu: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
    }),
  }
}
const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
  }),

  /*control: (_, { selectProps: { width }}) => ({
    width: width
  }),*/

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

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
  const handlePageSizeSelect = (a: any, b: any ) => {
    //dispatch(actions.setPageSize(value));
  };
  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setPlayersFilter(e.target.value));
  };
  const updateCurrentPage = (n: number) => {
    dispatch(actions.setCurrentPage(n));
  };

  const updateTeamFilter = (evn: OptionType[]) => {
    if (!evn) setTeamIds(null);
    else {
      let teamRequest: number[] = [];
      evn.map((item) => teamRequest.push(item.value));
      setTeamIds(teamRequest);
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
        <StyledSelect            
            classNamePrefix="Select"
            options={pageSizeOptions}     
            defaultValue={pageSizeOptions[0]}                
            onChange={handlePageSizeSelect}
          />
      </StyledFooter>
    </StyledMainContainer>
  );
};


