import React, { useEffect} from "react";
import {actions} from '../../../modules/players/actions';
import { useSelector, useDispatch } from 'react-redux';
import PlayerCard from './playerCard'
import { PlayerDto, PlayerDtoPageResult } from "../../interface/playerDto";
import {getCurrentPage, getFilter, getIsFetching, getPageSize, getPlayers} from '../selectors';
import Preloader from '../../../common/components/preloader';
import PlayerService from "../../../api/players/playerService";
import "./playerList.css"
import { Link } from "react-router-dom";
import  PageSizeSelector from "../../../common/components/PageSizeSelector";

type PropsType = {}
export const PlayerList : React.FunctionComponent<PropsType> = (props:PropsType) => {

  const dispatch = useDispatch();
  const players = useSelector(getPlayers);
  const currentPage = useSelector(getCurrentPage);
  const filter=useSelector(getFilter);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);
  
  const requestPlayers = ()=>{
    dispatch(actions.startRequest())
    let promise = PlayerService.getPlayers(filter,currentPage,pageSize);
    if(promise)
      promise
      .then(res=>{ dispatch(actions.gotPlayers(res as PlayerDtoPageResult))})
      .catch(err =>{dispatch(actions.finishRequest())});
  }
  
  useEffect(() => {  
    requestPlayers();
  }, [filter, currentPage, pageSize]);
  
  const handlePageSizeSelectorClick=(event: React.ChangeEvent<HTMLSelectElement>)=>{ 
    dispatch(actions.setPageSize(parseInt( event.target.value)));
  }
  const updateFilterValue=(e: React.ChangeEvent<HTMLInputElement>)=>{    
    dispatch(actions.setPlayersFilter(e.target.value));
  }

  return(
      <div className="playerList">               
        
          <div className="serachContainer">
                  <input type="text" onChange={evt => updateFilterValue(evt)} ></input>
                  <select>
                    <option>AAA</option>
                    <option>BBB</option>
                  </select>
                  <Link to="/players/0">Add</Link>
          </div>
                  {isFetching && <Preloader/>}
                  {players && players.map((p: PlayerDto) => 
                      <PlayerCard player={p} key={p.id}/>
                  )}
          <div className="footer">
                    {}
                    <PageSizeSelector onChange={handlePageSizeSelectorClick}/>                    
          </div>                
      </div>
  );        
}