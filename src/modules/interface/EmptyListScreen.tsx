import { NoTeamStyled } from "./StyledEmptyList";

export type EmptyListScreenPtopType={
    mode: "team"|"player"
}
export const EmptyListScreen : React.FunctionComponent<EmptyListScreenPtopType>=(props: EmptyListScreenPtopType)=>{
    return(
        <NoTeamStyled mode={props.mode}>
            <div></div>
            <h2>Empty here</h2>
            <span>Add new {props.mode == "team"? "teams" : "players"} to continue</span>
        </NoTeamStyled>
    );
}