import React, {Component, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { TeamDto } from '../../interface/teamDto';

type PropTypes={
    team: TeamDto
}
function TeamInfo (props: PropTypes) {
    
    return  (
        <div className='container'>
            <div className='containerHeader'>
                <span className='headerText'>
                    <Link to='/teams'>Teams</Link>
                    <span> / </span>
                    <span>{props.team.name}</span>
                </span>
                <div className='headerbuttons'>
                    <button>edit</button>
                    <button>delete</button>
                </div>
            </div>
            <div className='mainInfo'>
                <div className='logoContainer'></div>
                <div className='main'>
                    <h2>{props.team.name}</h2>
                    <div>
                        <div>
                            <h4>Year of foundation</h4>
                            <h4>{props.team.yearOfFoundation}</h4>
                        </div>
                        <div>
                            <h4>Division</h4>
                            <h4>{props.team.division}</h4>
                        </div>
                    </div>
                    <div>
                            <h4>Conference</h4>
                            <h4>{props.team.conference}</h4>
                        </div>

                </div>
            </div>

        </div>);
}
export default TeamInfo;