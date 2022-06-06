import { render } from "@testing-library/react"
import React, { Component } from "react"
import { TeamDto } from "../../interface/teamDto";


type PropsType = {
    team: TeamDto
}

export const TeamCard: React.FunctionComponent<PropsType> = (props: PropsType) =>{
    
        return(
            <div className="teamCard" key={props.team.id}>
                <img className="teamCardLogo" src={props.team.logoPath}/>
                <div className="teamCardFooter">
                    <a className="teamCardName" href="" title={props.team.name}>{props.team.name}</a>
                </div>
            </div>
        );    
}
