export interface NewPlayerDto {
  name?: string ;
  number?: number ;
  height?: number ;
  birthday?: Date ;
  weight?: number ;
  position?: string ;
  team?: number ;
  avatarUrl?: string ;
}

export interface PlayerDto extends NewPlayerDto {
  id?: number ;
  teamName?: string ;
}

export interface PlayerDtoPageResult {
  data: PlayerDto[];
  count: number;
  page: number;
  size: number;
}
