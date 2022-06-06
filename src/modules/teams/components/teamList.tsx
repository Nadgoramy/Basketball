import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeamService from '../../../api/teams/teamService';
import PageSizeSelector from "../../../common/components/PageSizeSelector";
import Preloader from "../../../common/components/preloader";
import { TeamDto, TeamDtoPageResult } from "../../interface/teamDto";
import {actions} from '../actions'
import { getCurrentPage, getFilter, getIsFetching, getPageSize, getTeams } from "../selectors";
import {TeamCard} from "./teamCard";

type PropType={}
export const TeamList : React.FunctionComponent<PropType> = (props:PropType) => {    
    
    const currentPage = useSelector(getCurrentPage);
    const filter=useSelector(getFilter);
    const pageSize = useSelector(getPageSize);    
    const isFetching = useSelector(getIsFetching);    
    const teams = useSelector(getTeams)
    let dispatch = useDispatch();
        
    const requestTeams = ()=>{
        dispatch(actions.startRequest())
        let promise = TeamService.getTeams(filter,currentPage,pageSize);
        if(promise)
          promise
          .then(res=>{ dispatch(actions.gotTeams(res as TeamDtoPageResult))})
          .catch(err =>{dispatch(actions.finishRequest())});
    }
      
    useEffect(() => {  
        requestTeams();
    }, [filter, currentPage, pageSize]);
      
    const handlePageSizeSelectorClick=(event: React.ChangeEvent<HTMLSelectElement>)=>{ 
        dispatch(actions.setPageSize(parseInt( event.target.value)));
    }
    const updateFilterValue=(e: React.ChangeEvent<HTMLInputElement>)=>{    
        dispatch(actions.setTeamsFilter(e.target.value));
    }
      
    return(
          <div className="teamList"> 
             <div className="serachContainer">
                  <input type="text" onChange={evt => updateFilterValue(evt)} ></input>                  
                  <Link to="/players/0">Add</Link>
             </div>
                {isFetching && <Preloader/>}
                {!teams && <div className="emptyList"></div>}
                {teams && teams.map(team => {                  
                        <TeamCard team={team}/>                        
                    })
                }
              <div className="footer">                   
                    <PageSizeSelector onChange={handlePageSizeSelectorClick}/>                    
              </div>                               
          </div>         
          ); 
}
