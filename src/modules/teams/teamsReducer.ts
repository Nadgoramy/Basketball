import { TeamDto } from "../interface/teamDto"
import { ActionsTypes, actionTypes } from "./actions"


type StateType = {
  needToReload:boolean
      isFetching: boolean  
      page: number
      count: number
      pageSize:number
      filter:string
      pageItems: Array<TeamDto>
}

const initialState: StateType = {
  needToReload:true,
  isFetching: false,  
  page: 1 ,
  count: 0,
  pageSize:6,
  filter:"",
  pageItems: Array<TeamDto>()
}
export function teams(
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
      case actionTypes.GOT_TEAMS:
        return Object.assign({}, state, {
          isFetching: false, 
          pageItems: action.teams.data,  
          needToReload:false   
        })
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
      default:
        return state
    }
}