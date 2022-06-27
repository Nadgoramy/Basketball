import { number } from 'prop-types'
import PlayerService from 'api/players/playerService';
import { BaseThunkType, InferActionsTypes } from 'core/redux/configureStore';
import {PlayerDto, NewPlayerDto, PlayerDtoPageResult} from 'api/Dto/playerDto'
import {actions, actionTypes, ActionsTypes} from './actions';

type PlayerStateType = {  
      isFetching: boolean 
      player: PlayerDto | null
}
const initialPlayerState: PlayerStateType = {  
  isFetching: false,  
  player: null
}
type PlayerActionType = {  
  type:  ()=>string 
  player: PlayerDto
  value: string | number
}

export function player(state:PlayerStateType  = initialPlayerState, action: PlayerActionType) {
    switch(action.type){
        case actionTypes.SET_PLAYER:
            {
                return Object.assign({}, state, {
                    player: action.player,                    
                    isFetching: false,
                  })    
            }       
        case actionTypes.SET_PLAYER_NAME:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              name: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_AVATAR:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              avatarUrl: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_POSITION:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              position: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_BIRTHDAY:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              birthday: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_HEIGHT:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              height: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_WEIGHT:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              weight: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_TEAM:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              team: action.value,
            }            
          })        
        } 
        case actionTypes.SET_PLAYER_NUMBER:{
          return Object.assign({}, state, {
            player: {
              ...state.player,
              number: action.value,
            }            
          })          
        } 
        default:
            return state;
    }
}


type StateType = {
  needToReload:boolean
      isFetching: boolean  
      page: number
      count: number
      pageSize:number
      filter:string
      pageItems: PlayerDto[]
}

const initialState: StateType = {
  needToReload:true,
  isFetching: false,  
  page: 1,
  count: 0,
  pageSize:6,
  filter:"",
  pageItems: []
}

export function players(
    state: StateType = initialState,    action: ActionsTypes
  ) {
   
    switch (action.type) {      
      case actionTypes.START_REQUEST:{
        return Object.assign({}, state, {
          isFetching: true          
        })
      }
      
      case actionTypes.GOT_PLAYERS:
        console.log(action);
        return  {
          ...state,
          isFetching: false, 
          page: action.playersPage.page,
          count: action.playersPage.count,       
          pageItems: action.playersPage.data,  
          needToReload:false   
        }
        case actionTypes.SET_FILTER:{
          return Object.assign({}, state, {
            filter: action.filter          
          })
        }
        case actionTypes.SET_CURRENTPAGE:{
          return Object.assign({}, state, {
            page: action.page       
          })
        }
        case actionTypes.SET_PAGESIZE:{
          return Object.assign({}, state, {
            pageSize: action.pageSize,
            page: 1          
          })
        }
        case actionTypes.SET_PLAYER:
            {
                return Object.assign({}, state, {
                    isFetching: false,  
                    needToReload:true
                  })
    
            }
      default:
        return state
    }
}

//type ActionsTypes = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsTypes>