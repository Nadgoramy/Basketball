import { TeamDto } from "api/Dto/teamDto";
import { TeamService } from "api/requests/teamService";
import { OptionTypeValueNumber } from "common/components/StyledSelect";

export async function LoadTeamOptions() {
    let teamCount = 25;
    let iteration = 0;
    let options = new Array<OptionTypeValueNumber>();
    do {
      iteration++;
      let responce = await TeamService.getTeams("", iteration, 25);
      teamCount = responce.count;
      responce.data.map((t: TeamDto) =>
        options.push({ label: t.name, value: t.id })
      );
    } while (options.length < teamCount);
    return options;
  }