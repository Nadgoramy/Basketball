import { get, post, remove, put } from "../baseRequest";
import { NewTeamDto, TeamDto, TeamDtoPageResult } from "api/Dto/teamDto";
const API_URL = "team/";

const getTeams = (name: string, page: number, pageSize: number) => {
  const requestParams =
    "?Name=" + name + "&Page=" + page + "&PageSize=" + pageSize;
  return get(API_URL + "getteams" + requestParams).then((response) => {
    return response as TeamDtoPageResult;
  });
};

const getTeam = (id: number) => {
  return get(API_URL + "get?id=" + id).then((response) => {
    return response as TeamDto;
  });
};

const addTeam = (team: NewTeamDto) => {
  return post<NewTeamDto>(API_URL + "add", team);
};

const updateTeam = (team: TeamDto) => {
  return put(API_URL + "update", team);
};

const deleteTeam = (id: number) => {
  return remove(API_URL + "delete?id=" + id);
};

export const TeamService = {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
};
