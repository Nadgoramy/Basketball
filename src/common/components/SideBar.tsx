
  import React from 'react';
import { useDispatch } from 'react-redux';
  import {Link, NavLink} from 'react-router-dom';
  import "./SideBar.css"

const menu=[
    {
    link:'/teams',
    label:'Teams'
  },
  {
    link:'/players',
    label:'Players'
  }
  ];


const SideBar = (props:any) => {  
  const dispatch = useDispatch();  
  const logout = ()=>{
      localStorage.removeItem("user");      
      dispatch({type:'REMOVE_USER'});
    }  
    return (
        
            <div className='sideBarContainer'> 
            
            <ul className='right'>                
                <li><Link to='/teams'>Teams</Link></li>
                <li><Link to='/players'>Players</Link></li>
            </ul>
            <Link to="/" onClick={logout}>Sing Out</Link>
            <button onClick={(e)=>{e.preventDefault();}}>LogOut</button>
            <nav className='nav-wrapper red dark' ></nav>
            </div>
        
    );
}
export default SideBar;