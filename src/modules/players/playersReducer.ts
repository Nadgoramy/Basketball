import { number } from 'prop-types'
import PlayerService from '../../api/players/playerService';
import { BaseThunkType, InferActionsTypes } from '../../core/redux/configureStore';
import {PlayerDto, NewPlayerDto, PlayerDtoPageResult} from '../interface/playerDto'
import {actions, actionTypes, ActionsTypes} from './actions';

export const player = (state: PlayerDto, action: any) => {
    switch(action.type){
        
        case 'ADD_PLAYER':{
          let newPlayer = Object.assign(new NewPlayerDto(), action);
          return newPlayer;         
      }
        case 'UPDATE_PLAYER': 
            if(state.id !== action.id)
                return state;
            
            return {
                ...state,
                name: action.name,
                number: action.number,
                height: action.height,
                weight: action.weight,
                birthday: action.birthday,
                position: action.position,
                team: action.team,
                avatarUrl: action.avatarUrl
            }
        default:
            return state;
    }
}
const players1 = (state: PlayerDto[] = [], action:any)=>{    
    switch(action.type){
        case 'ADD_PLAYER':
            return[
                ...state,
                player(new PlayerDto(), action)
            ]
        case 'TOGGLE_TODO': 
            return state.map( t => player(t, action));
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
    state: StateType = initialState,
    action: ActionsTypes
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
          //pageSize: action.playersPage.size,        
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
            pageSize: action.pageSize          
          })
        }
        case actionTypes.GET_PLAYER:
        case actionTypes.ADD_PLAYER:
        case actionTypes.UPDATE_PLAYER:
        case actionTypes.DELETE_PLAYER:
            {
                return Object.assign({}, state, {
                    isFetching: false,                          
                    //player: action.player,
                    needToReload:true
                  })
    
            }
      default:
        return state
    }
}

//type ActionsTypes = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsTypes>