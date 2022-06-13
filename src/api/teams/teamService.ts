import {get, post, remove, put} from '../baseRequest';
import AuthService from '../authService';
import { NewTeamDto, TeamDto } from 'api/Dto/teamDto';

const API_URL = "team/";


const getTeams = (name: string, page: number, pageSize: number) => {
  let currentUser = AuthService.getCurrentUser();
  if(!currentUser) return;
  let requestParams = "?Name="+name+"&Page="+page+"&PageSize="+pageSize;  
  return get(API_URL + "getteams"+requestParams,  currentUser.token)
    .then((response) => {      
      return response;
    });
};

const getTeam = (id: number) => {
    let currentUser = AuthService.getCurrentUser();
    console.log("trying to get team by id");
    if(!currentUser) return;
    return get(API_URL + "get?id=" + id,  currentUser.token)
      .then((response) => {        
        return response.data;
      });
  };


  const addTeam = (team: NewTeamDto) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return post(API_URL + "add", { team },  currentUser.token)
      .then((response) => {        
        return response.data;
      });
  };

  const updateTeam = (team: TeamDto) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return put(API_URL + "update", { team },  currentUser.token)
      .then((response) => {        
        return response.data;
      });
  };

  const deleteTeam = (id: number) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return remove(API_URL + "delete?id=" + id,  currentUser.token)
      .then((response) => {        
        return response.data;
      });
  };


const TeamService = {
 
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam
};
export default TeamService;