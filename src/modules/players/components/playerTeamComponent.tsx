import { OptionTypeValueNumber, SingleSelectCustomStyles, StyledSelect } from "common/components/StyledSelect";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import React, { LegacyRef, RefObject } from "react";
import { forwardRef, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import reactSelect from "react-select";
import Select from "react-select/dist/declarations/src/Select";
import { getTeamOptions } from "../hooks/teamOptionSlice";
import { getTeamsOptions } from "../selectors";

type PlayerTeamComponentProps = {
    error?: string
} & ControllerRenderProps;

const PlayerTeamComponent = (props: PlayerTeamComponentProps, ref: any) => {
    const teamOptions = useAppSelector(getTeamsOptions);
    const { error, onChange, onBlur, value } = props;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTeamOptions());
    }, []);

    return (
        <StyledSelect
            border={false}
            classNamePrefix="Select"
            styles={SingleSelectCustomStyles}
            className={error ? "error" : ""}
            options={teamOptions.map(x => teamOptions.indexOf(x) === teamOptions.length - 1 ?
                { ...x, isLast: true }
                : { ...x, isLast: false }
            )}
            menuPlacement="auto"
            onChange={(newValue, action) => {
                onChange((newValue as OptionTypeValueNumber).value);
            }}
            onBlur={onBlur}
            value={
                teamOptions
                    ? teamOptions.find(
                        (o: OptionTypeValueNumber) => o.value == value
                    )
                    : undefined
            }
            ref={ref}
        />
    );
};

export default React.forwardRef(PlayerTeamComponent)