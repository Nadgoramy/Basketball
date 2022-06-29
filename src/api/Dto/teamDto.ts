import { PlayerDto } from "./playerDto";

export interface TeamDto extends NewTeamDto {
  id: number;
  players: PlayerDto[];
}

export interface NewTeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}

export interface TeamDtoPageResult {
  data: TeamDto[];
  count: number;
  page: number;
  size: number;
}
