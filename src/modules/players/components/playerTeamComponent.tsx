import { OptionTypeValueNumber, SingleSelectCustomStyles, StyledSelect } from "common/components/StyledSelect";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import React, { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { getTeamOptions } from "../hooks/teamListSlice";
import { getTeamList } from "../selectors";

type PlayerTeamComponentProps = {
    error?: string
} & ControllerRenderProps;

const PlayerTeamComponent = (props: PlayerTeamComponentProps, ref: any) => {
    const teamList = useAppSelector(getTeamList);
    const { error, onChange, onBlur, value } = props;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTeamOptions());
    }, []);

    const teamOptions = React.useMemo(() => {
        let options = new Array<OptionTypeValueNumber>();
        teamList.map(t => options.push({ label: t.name, value: t.id, isLast: (teamList.indexOf(t) === teamList.length - 1) }));
        return options;
    }, [teamList]);

    return (
        <StyledSelect
            border={false}
            classNamePrefix="Select"
            styles={SingleSelectCustomStyles}
            className={error ? "error" : ""}
            options={teamOptions}
            menuPlacement="auto"
            onChange={(newValue, action) => {
                onChange((newValue as OptionTypeValueNumber).value);
            }}
            onBlur={onBlur}
            value={
                teamOptions
                    ? teamOptions.find(
                        (o: OptionTypeValueNumber) => o.value === value
                    )
                    : undefined
            }
            ref={ref}
        />
    );
};

export default React.forwardRef(PlayerTeamComponent)