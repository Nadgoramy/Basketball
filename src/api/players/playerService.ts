import {get, post, remove, put} from 'api/baseRequest';
import AuthService from 'api/authService';
import {NewPlayerDto, PlayerDto, PlayerDtoPageResult} from 'api/Dto/playerDto';


const API_URL = "player/";

const getPositions = () => {
  let currentUser = AuthService.getCurrentUser();
  if(!currentUser) return;
  return get(API_URL + "getpositions", currentUser.token)
    .then((response) => {      
      return response.data;
    })
    .catch((err)=>{console.log(err)});
}

const getPlayers = (name: string, page: number, pageSize: number) => {
  let currentUser = AuthService.getCurrentUser();
  if(!currentUser) return;
  let requestParams = "?Name="+name+"&Page="+page+"&PageSize="+pageSize
  console.log(requestParams);
  return get(API_URL + "getplayers"+requestParams,  currentUser.token)
    .then((response) => {    
      let result : PlayerDtoPageResult = response;
      return result;        
    })
    .catch((err)=>{console.log(err)});
};

const getPlayer = (id: number) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return get(API_URL + "get?id=" + id,  currentUser.token)
      .then((response) => {        
        let result : PlayerDto = response.data;
      return result;  
      })
      .catch((err)=>{console.log(err)});
  };


  const addPlayer = (player: NewPlayerDto) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return post(API_URL + "add", { player },  currentUser.token)
      .then((response) => {        
        let result : PlayerDto = response.data;
      return result;  
      })
      .catch((err)=>{console.log(err)});
  };

  const updatePlayer = (player: PlayerDto) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return put(API_URL + "update", { player },  currentUser.token)
      .then((response) => {        
        let result : PlayerDto = response.data;
        return result;  
      })
      .catch((err)=>{console.log(err)});
  };

  const deletePlayer = (id: number) => {
    let currentUser = AuthService.getCurrentUser();
    if(!currentUser) return;
    return remove(API_URL + "delete?id=" + id,  currentUser.token)
      .then((response) => {        
        let result : PlayerDto = response.data;
        return result;  
      })
      .catch((err)=>{console.log(err)});
  };


const PlayerService = {
  getPositions,
  getPlayers,
  getPlayer,
  addPlayer,
  updatePlayer,
  deletePlayer
};
export default PlayerService;