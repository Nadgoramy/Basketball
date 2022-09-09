import { get, post, remove, put } from "api/baseRequest";
import {
  NewPlayerDto,
  PlayerDto,
  PlayerDtoPageResult,
} from "api/Dto/playerDto";
import { PositionDto } from "api/Dto/positionDto";

const API_URL = "player/";

const getPositions = () => {
  return get(API_URL + "getpositions")
    ?.then((response) => {
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
  let requestParams =
    "?Name=" + name + "&Page=" + page + "&PageSize=" + pageSize;
  if (teamIds) teamIds.forEach((tId) => (requestParams += "&TeamIds=" + tId));
  return get(API_URL + "getplayers" + requestParams).then(
    (response) => {
      return response as PlayerDtoPageResult;
    }
  );
};

const getPlayer = (id: number) => {
  return get(API_URL + "get?id=" + id);
};

const addPlayer = (player: NewPlayerDto) => {
  
  return post(API_URL + "add", player).then((response) => {
    return response as PlayerDto;
  });
};

const updatePlayer = (player: PlayerDto) => {  
  return put(API_URL + "update", player).then((response) => {
    return response as PlayerDto;
  });
};

const deletePlayer = (id: number) => {  
  return remove(API_URL + "delete?id=" + id).then(
    (response) => {
      return response as PlayerDto;
    }
  );
};

export const PlayerService = {
  getPositions,
  getPlayers,
  getPlayer,
  addPlayer,
  updatePlayer,
  deletePlayer,
};

