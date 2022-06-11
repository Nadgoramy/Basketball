import { NewPlayerDto, PlayerDto, PlayerDtoPageResult } from "../../api/Dto/playerDto";
import PlayerService from "api/players/playerService";
import { InferActionsTypes } from "core/redux/configureStore";
import { string } from "prop-types";

export const actionTypes = {
 START_REQUEST : () => ("START_REQUEST"),
 FINISH_REQUEST : () => ("FINISH_REQUEST"),
 SET_FILTER: () =>  'SET_PLAYERS_FILTER',
 SET_CURRENTPAGE : () =>  'SET_CURRENTPAGE',
 SET_PAGESIZE: () =>  'SET_PAGESIZE',
 GOT_PLAYERS: () =>  'GET_PLAYERS',
 GET_PLAYER: () =>  'GET_PLAYER',
 ADDED_PLAYER: () =>  'ADDED_PLAYER',
 ADD_PLAYER: () =>  'ADD_PLAYER',
 UPDATE_PLAYER: () =>  'UPDATE_PLAYER',
 DELETE_PLAYER: () =>  'DELETE_PLAYER'
}

export const actions = {
  startRequest: () => ({type: actionTypes.START_REQUEST} as const),
  finishRequest:() => ({type : actionTypes.FINISH_REQUEST}),
  setPlayersFilter: (filter:string) => ({filter: filter,type: actionTypes.SET_FILTER} as const ),
  setCurrentPage: (page:number) =>({ page: page, type: actionTypes.SET_CURRENTPAGE } as const),
  setPageSize: (size:number) =>( { pageSize: size, type: actionTypes.SET_PAGESIZE } as const),
  gotPlayers: ( result :PlayerDtoPageResult) => ({ type: actionTypes.GOT_PLAYERS, playersPage: result } as const),

     
}
export type ActionsTypes = {
  type: ()=>string
  playersPage: PlayerDtoPageResult
  pageSize: number
  page: number
  filter: string
}

export function requestPlayers() {
  return {
    type: actionTypes.START_REQUEST,        
  } as const
}

export function setPlayersFilter(filter:string) {
  return {    
    filter: filter,
    type: actionTypes.SET_FILTER     
  } as const
}

export function setCurrentPage(page:number) {
  return {    
    page: page,
    type: actionTypes.SET_CURRENTPAGE     
  } as const
}

export function setPageSize(size:number) {
  return {    
    pageSize: size,
    type: actionTypes.SET_PAGESIZE     
  } as const
}

export type GotPlayerActionType={
  type: typeof actionTypes.GOT_PLAYERS,
  playersPage: PlayerDtoPageResult
}

export function gotPlayers( result :PlayerDtoPageResult):GotPlayerActionType{
  return {
    type: actionTypes.GOT_PLAYERS,    
    playersPage: result,
    //receivedAt: Date.now()
  } as const
}

export function getPlayersAction(page:number, pageSize: number, filter:string) {
  return async (dispatch:any) => {
    dispatch(requestPlayers());
    dispatch(setPlayersFilter(filter))
    const response = await PlayerService.getPlayers(filter, page, pageSize);
    if(!response)return;
      dispatch(gotPlayers(response));
  }  
}

export function getPlayer(action: object, id:number) {
  return {
    type: actionTypes.GET_PLAYER,
    action,
    id: id
  }  as const
}

export function addedPlayer( player: PlayerDto) {
    return {
      type: actionTypes.ADDED_PLAYER,      
      player: player
    } as const
  }

export function addPlayer(player: NewPlayerDto) {
  return async (dispatch:any) => {
    dispatch(requestPlayers());
    const response = await PlayerService.addPlayer(player);
    if(!response)return ;
    dispatch(addedPlayer(response));
  }   
}

  export function updatePlayer(player: PlayerDto) {
      return {
        type: actionTypes.UPDATE_PLAYER,        
        player: player
      } as const
    }

    
    export function deletePlayer( player: PlayerDto) {
        return {
          type: actionTypes.DELETE_PLAYER,
          player: player
        } as const
      }

