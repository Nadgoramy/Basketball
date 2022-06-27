

export  interface NewPlayerDto{    
    name: string | undefined;
    number: number | undefined;
    height: number | undefined;
    birthday: Date | undefined;
    weight: number | undefined;
    position: string | undefined;
    team: number | undefined;    
    avatarUrl:string | undefined;
}

export  interface PlayerDto extends NewPlayerDto {
    id: number | undefined;
    /*name: string | undefined;
    number: number | undefined;
    height: number | undefined;
    weight: number | undefined;
    birthday: Date | undefined;
    position: string | undefined;
    team: number | undefined;
    avatarUrl: string | undefined;  */
    teamName: string | undefined;    
}

export interface PlayerDtoPageResult{
  data:	PlayerDto[];
  count: number;
  page: number;
  size: number;

  /*constructor(data: [], count: number, page: number, size: number){
      this.data = data.map(x => Object.assign(new PlayerDto(), x));
      this.count = count;
      this.page = page;
      this.size = size;
  }*/
  }