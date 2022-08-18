import { NoTeamStyled } from "./StyledEmptyList";

export type EmptyListPtopType = {
  mode: "team" | "player";
};
export const EmptyList: React.FunctionComponent<EmptyListPtopType> = (
  props: EmptyListPtopType
) => {
  return (
    <NoTeamStyled mode={props.mode}>
      <div></div>
      <h2>Empty here</h2>
      <span>
        Add new {props.mode == "team" ? "teams" : "players"} to continue
      </span>
    </NoTeamStyled>
  );
};
