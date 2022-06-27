import { TeamDtoPageResult } from "api/Dto/teamDto"

export const actionTypes = {
    START_REQUEST : () => ("START_REQUEST"),
    FINISH_REQUEST : () => ("FINISH_REQUEST"),
    SET_FILTER: () =>  'SET_FILTER',
    SET_CURRENTPAGE : () =>  'SET_CURRENTPAGE',
    SET_PAGESIZE: () =>  'SET_PAGESIZE',
    GOT_TEAMS: () =>  'GOT_TEAMS', 
   }

export const actions = {
    startRequest: () => ({type: actionTypes.START_REQUEST} as const),
    finishRequest:()=>({type: actionTypes.FINISH_REQUEST} as const),
    setTeamsFilter: (filter:string) => ({filter: filter,type: actionTypes.SET_FILTER} as const ),
    setCurrentPage: (page:number) =>({ page: page, type: actionTypes.SET_CURRENTPAGE } as const),
    setPageSize: (size:number) =>( { pageSize: size, type: actionTypes.SET_PAGESIZE } as const),
    gotTeams: ( teams :TeamDtoPageResult) => ({ type: actionTypes.GOT_TEAMS, teams: teams } as const),
    
}

export type ActionsTypes = {
    type: ()=>string
    teams: TeamDtoPageResult
    pageSize: number
    page: number
    filter: string  
  }