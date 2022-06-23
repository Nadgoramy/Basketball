import TeamService from 'api/teams/teamService'
import { TeamDto, TeamDtoPageResult } from "api/Dto/teamDto"
import { actions } from '../teamReducer';

export const requestTeam = (id: number, dispatch: any) => {
    let promise = TeamService.getTeam(id);
    if (promise)
      promise
        .then((res) => {
          dispatch(actions.setTeam(res as TeamDto));
        })
        .catch((err) => {
          console.log("err");
        });
  };

