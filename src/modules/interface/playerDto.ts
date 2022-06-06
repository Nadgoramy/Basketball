

export  class NewPlayerDto{    
    name: string | undefined;
    number: number | undefined;
    height: number | undefined;
    birthday: Date | undefined;
    weight: number | undefined;
    position: string | undefined;
    team: number | undefined;    
    avatarUrl:string | undefined;

    /*constructor(name:string , num: number, height: number, weight: number, birthday: string, position: string, team: number, avatar: string) {
        this.name = name;
        this.number = num;
        this.height = height;
        this.weight = weight;
        this.birthday = new Date(birthday);
        this.position = position;
        this.team = team;
        this.avatarUrl = avatar;
      }*/
}

export  class PlayerDto{
    id: number | undefined;
    name: string | undefined;
    number: number | undefined;
    height: number | undefined;
    weight: number | undefined;
    birthday: Date | undefined;
    position: string | undefined;
    team: number | undefined;
    avatarUrl: string | undefined;  
    teamName: string | undefined;

    /*constructor(obj: object) {
      Object.assign(this, obj);
    }*/

    /*constructor(id: number, name: string, num: number, height: number, weight: number, birthday:string, position:string, team:number, avatar:string, teamName:string) {
        this.id = id;
        this.name = name;
        this.number = num;
        this.height = height;
        this.weight = weight;
        this.birthday = new Date(birthday);
        this.position = position;
        this.team = team;
        this.avatarUrl = avatar;
        this.teamName = teamName;
      }*/
}

export class PlayerDtoPageResult{
  data:	PlayerDto[];
  count: number;
  page: number;
  size: number;

  constructor(data: [], count: number, page: number, size: number){
      this.data = data.map(x => Object.assign(new PlayerDto(), x));
      this.count = count;
      this.page = page;
      this.size = size;
  }
  }