import TeamService from 'api/teams/teamService'
import { TeamDto } from "api/Dto/teamDto"
import { actions } from '../teamReducer';

export const requestTeam = (id: number, dispatch: any, navigate?: any) => {
    let promise = TeamService.getTeam(id);
    if (promise)
      promise
        .then((res) => {
          console.log(res);
          if(id>0 && res ==null)navigate("/notfound")
          dispatch(actions.setTeam(res as TeamDto));
        })
        .catch((err) => {
          console.log("err");
          navigate("/notfound")
        });
  };

