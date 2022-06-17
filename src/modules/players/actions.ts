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
 DELETE_PLAYER: () =>  'DELETE_PLAYER',
 
 SET_PLAYER_NAME: () =>  'SET_PLAYER_NAME',
 SET_PLAYER_POSITION: () =>  'SET_PLAYER_POSITION',
 SET_PLAYER_HEIGHT: () =>  'SET_PLAYER_HEIGHT',
 SET_PLAYER_WEIGHT: () =>  'SET_PLAYER_WEIGHT',
 SET_PLAYER_TEAM: () =>  'SET_PLAYER_TEAM',
 SET_PLAYER_AVATAR: () =>  'SET_PLAYER_AVATAR',
 SET_PLAYER_BIRTHDAY: () =>  'SET_PLAYER_BIRTHDAY',
 SET_PLAYER_NUMBER: () =>  'SET_PLAYER_NUMBER',
}

export const actions = {
  startRequest: () => ({type: actionTypes.START_REQUEST} as const),
  finishRequest:() => ({type : actionTypes.FINISH_REQUEST}),
  setPlayersFilter: (filter:string) => ({filter: filter,type: actionTypes.SET_FILTER} as const ),
  setCurrentPage: (page:number) =>({ page: page, type: actionTypes.SET_CURRENTPAGE } as const),
  setPageSize: (size:number) =>( { pageSize: size, type: actionTypes.SET_PAGESIZE } as const),
  gotPlayers: ( result :PlayerDtoPageResult) => ({ type: actionTypes.GOT_PLAYERS, playersPage: result } as const),
}

export const playerActions = {
  getPlayer:(player: PlayerDto)=>({type: actionTypes.GET_PLAYER, player: player} as const ),
  addedPlayer:(player: PlayerDto)=>({type: actionTypes.GET_PLAYER, player: player} as const ),
  updatePlayer:(player: PlayerDto)=>({type: actionTypes.GET_PLAYER, player: player} as const ),
  deletePlayer:(player: PlayerDto)=>({type: actionTypes.GET_PLAYER, player: player} as const ),

  setName:(value: string)=>({type: actionTypes.SET_PLAYER_NAME, value: value} as const ),
  setPosition:(value: string)=>({type: actionTypes.SET_PLAYER_POSITION, value: value} as const ),
  setAvatar:(value: string)=>({type: actionTypes.SET_PLAYER_AVATAR, value: value} as const ),
  setBirthday:(value: string)=>({type: actionTypes.SET_PLAYER_BIRTHDAY, value: value} as const ),
  setHeight:(value: number)=>({type: actionTypes.SET_PLAYER_HEIGHT, value: value} as const ),
  setWeight:(value: number)=>({type: actionTypes.SET_PLAYER_WEIGHT, value: value} as const ),
  setNumber:(value: number)=>({type: actionTypes.SET_PLAYER_NUMBER, value: value} as const ),
  setTeamId:(value: number)=>({type: actionTypes.SET_PLAYER_TEAM, value: value} as const ),
}

export type ActionsTypes = {
  type: ()=>string
  playersPage: PlayerDtoPageResult
  pageSize: number
  page: number
  filter: string
}


export type GotPlayerActionType={
  type: typeof actionTypes.GOT_PLAYERS,
  playersPage: PlayerDtoPageResult
}

