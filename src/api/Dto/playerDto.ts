export interface NewPlayerDto {
  name: string | undefined;
  number: number | undefined;
  height: number | undefined;
  birthday: Date | undefined;
  weight: number | undefined;
  position: string | undefined;
  team: number | undefined;
  avatarUrl: string | undefined;
}

export interface PlayerDto extends NewPlayerDto {
  id: number | undefined;
  teamName: string | undefined;
}

export interface PlayerDtoPageResult {
  data: PlayerDto[];
  count: number;
  page: number;
  size: number;
}
