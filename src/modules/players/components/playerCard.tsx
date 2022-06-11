import { render } from "@testing-library/react";
import { Component } from "react";
import PropTypes from 'prop-types';
import { PlayerDto } from "api/Dto/playerDto";
//import { Typography } from '@mui/material';
import "./playerCard.css";

type PlayerCardPtopType ={
    player: PlayerDto
}
class PlayerCard extends Component<PlayerCardPtopType>{
    render(){
        return(
            <div className="playerCard" key ={this.props.player.id}>
                <div className="playerCardPhoto" style={{background:`url(${this.props.player.avatarUrl})`}}>
                    
                </div>
       
                <div className="playerCardFooter">
                    <h4 className="playerCardName">
                        {this.props.player.name} 
                        <span className="playerCardNumber">#{this.props.player.number}</span>
                    </h4>;                  
                    <p>{this.props.player.teamName}</p>
                </div>
            </div>
        );
    }
}
//   <img src={this.props.player.avatarUrl} alt="" />      <img className="playerCardLogo" src={this.props.player.avatarUrl}/>
export default PlayerCard;