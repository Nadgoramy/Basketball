import { PlayerDto } from "api/Dto/playerDto"
import { TeamDto } from "api/Dto/teamDto"

export const actionTypes = {
    START_REQUEST : () => ("START_REQUEST"),
    FINISH_REQUEST : () => ("FINISH_REQUEST"), 
    SET_TEAM: () =>  'SET_TEAM',   
    GOT_TEAM_PLAYERS: ()  => 'GOT_TEAM_PLAYERS',
    SET_TEAMIMAGE:() =>'SET_TEAMIMAGE'
   }

export const actions = {
    startRequest: () => ({type: actionTypes.START_REQUEST} as const),
    finishRequest:()=>({type: actionTypes.FINISH_REQUEST} as const),
    setTeam: ( team :TeamDto) => ({ type: actionTypes.SET_TEAM, team: team } as const),
    setTeamImage: ( value :string) => ({ type: actionTypes.SET_TEAMIMAGE, value: value } as const),
    gotTeamPlayers: ( players: PlayerDto[]) => ({type: actionTypes.GOT_TEAM_PLAYERS, players: players} as const)
}

export type ActionsTypes = {
    type: ()=>string
    team: TeamDto,
    players: PlayerDto[],
    value: string    
  }

type StateType = {  
      isFetching: boolean        
      team:TeamDto | null
}

const initialState: StateType = {  
  isFetching: false,   
  team: null
}
export function team(
    state = initialState,
    action: ActionsTypes
  ) {
   
    switch (action.type) {      
      case actionTypes.START_REQUEST:{
        return Object.assign({}, state, {
          isFetching: true          
        })
      }
      case actionTypes.FINISH_REQUEST:{
        return Object.assign({}, state, {
          isFetching: false          
        })
      }            
        case actionTypes.SET_TEAM:
        return Object.assign({}, state, {
          isFetching: false, 
          team: action.team, 
        })   
        case actionTypes.SET_TEAMIMAGE:
          return Object.assign({}, state,{
            team:{
              ...team,
              imageUrl: action.value
            }
          })      
      default:
        return state
    }
}