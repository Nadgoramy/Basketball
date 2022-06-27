import { PlayerDto } from "api/Dto/playerDto";
import { PositionDto } from "api/Dto/positionDto";
import { TeamDto, TeamDtoPageResult } from "api/Dto/teamDto";
import PlayerService from "api/players/playerService";
import TeamService from "api/teams/teamService";
import { playerActions } from "../actions";

export const requestPlayer = (id: number, dispatch: any) => {
    let promise = PlayerService.getPlayer(id);
    if (promise)
      promise
        .then((res) => {
          dispatch(playerActions.setPlayer(res as PlayerDto));
        })
        .catch((err) => {
          console.log("err");
        });
  };

  export const requestPositionOptions=(callback: any)=>{
    PlayerService.getPositions()?.then((res) => {
      if(res){
        let optopns = new Array<OptionType>();
        res.map((t : PositionDto)  =>
          optopns.push({ label: t.title, value: t.id })
          );
          callback(optopns);
        }
    });
  }

  export interface OptionType {
    label: string;
    value: number;
  }
  export const requestTeamOptions = (callback: any) => {
    let promise = TeamService.getTeams("", 1, 1);
    if (promise)
      promise
        .then((res) => {
          getTeamNames((res as TeamDtoPageResult).count, callback);
        })
        .catch((err) => {
          console.log("err");
        });
  };

  const getTeamNames = (totalCount: number, callback: any) => {
    let promise = TeamService.getTeams("", 1, totalCount);
    if (promise)
      promise
        .then((res) => {
          let names = new Array<OptionType>();
          (res as TeamDtoPageResult).data.map((t: TeamDto) =>
            names.push({ label: t.name, value: t.id })
          );
          callback(names);
        })
        .catch((err) => {
          console.log("err");
        });
  };
