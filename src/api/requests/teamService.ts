import { get, post, remove, put } from "../baseRequest";
import AuthService from "./authService";
import { NewTeamDto, TeamDto } from "api/Dto/teamDto";

const API_URL = "team/";

const getTeams = (name: string, page: number, pageSize: number) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    throw {
      isCustomError: true,
      status: 401,
      message: "Authorization exception",
    };
  }
  const requestParams =
    "?Name=" + name + "&Page=" + page + "&PageSize=" + pageSize;
  return get(API_URL + "getteams" + requestParams, currentUser.token);
};

const getTeam = (id: number) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser)
    return new Promise((_, reject) => {
      reject("Authorization exception");
    });
  return get(API_URL + "get?id=" + id, currentUser.token);
};

const addTeam = (team: NewTeamDto) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser)
    return new Promise((_, reject) => {
      reject("Authorization exception");
    });
  return post<NewTeamDto>(API_URL + "add", team, currentUser.token);
};

const updateTeam = (team: TeamDto) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return;
  return put(API_URL + "update", team, currentUser.token);
};

const deleteTeam = (id: number) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return;
  return remove(API_URL + "delete?id=" + id, currentUser.token);
};

const TeamService = {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
};
export default TeamService;
