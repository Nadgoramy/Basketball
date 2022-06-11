import { PlayerDto } from "./playerDto";

export  class TeamDto{
    id: number =0;
    imageUrl: string ="";
    name: string = "";
    yearOfFoundation: number = 0;
    division: string ="";
    conference: string = "";
    players: PlayerDto[] = [];
}

export class NewTeamDto{
    name:	string = "";
    foundationYear:	number =0;
    division: string  = "";    
    conference:	string = "";    
    imageUrl: string = "";    
    }

export class TeamDtoPageResult{
    data:	TeamDto[] =[];
    count:	number = 0;
    page:	number = 1;
    size:	number = 6;
    }