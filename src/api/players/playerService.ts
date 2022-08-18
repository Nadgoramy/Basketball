import { get, post, remove, put } from "api/baseRequest";
import AuthService from "api/requests/authService";
import {
  NewPlayerDto,
  PlayerDto,
  PlayerDtoPageResult,
} from "api/Dto/playerDto";
import { PositionDto } from "api/Dto/positionDto";

const API_URL = "player/";

const getPositions = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return null;
  return get(API_URL + "getpositions", currentUser.token).then((response) => {
    let list: PositionDto[] = [];
    (response as Array<string>).map((value: any, i: number) =>
      list.push({ id: i, title: value } as PositionDto)
    );
    return list;
  });
};

const getPlayers = (
  name: string = "",
  page: number = 1,
  pageSize: number,
  teamIds: number[] | null
) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return;
  let requestParams =
    "?Name=" + name + "&Page=" + page + "&PageSize=" + pageSize;
  if (teamIds) teamIds.forEach((tId) => (requestParams += "&TeamIds=" + tId));
  return get(API_URL + "getplayers" + requestParams, currentUser.token).then(
    (response) => {
      return response as PlayerDtoPageResult;
    }
  );
};

const getPlayer = (id: number) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return null;
  return get(API_URL + "get?id=" + id, currentUser.token).then((response) => {
    return response as PlayerDto;
  });
};

const addPlayer = (player: NewPlayerDto) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return;
  return post(API_URL + "add", player, currentUser.token).then((response) => {
    return response as PlayerDto;
  });
};

const updatePlayer = (player: PlayerDto) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return;
  return put(API_URL + "update", player, currentUser.token).then((response) => {
    return response as PlayerDto;
  });
};

const deletePlayer = (id: number) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return;
  return remove(API_URL + "delete?id=" + id, currentUser.token).then(
    (response) => {
      return response as PlayerDto;
    }
  );
};

const PlayerService = {
  getPositions,
  getPlayers,
  getPlayer,
  addPlayer,
  updatePlayer,
  deletePlayer,
};
export default PlayerService;
