
import { OptionTypeValueNumber, SingleSelectCustomStyles, StyledSelect } from "common/components/StyledSelect";
import { AppStateType } from "core/redux/configureStore";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import React from "react";
import { useEffect, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { getPositions } from "../hooks/positionSlice";

type PlayerPositionComponentProps = {
    error?: string
} & ControllerRenderProps

const PlayerPositionComponent = (props: PlayerPositionComponentProps, ref: any) => {
    const { error, onChange, onBlur, value } = props;
    const dispatch = useAppDispatch()
    const positions = useAppSelector(
        (store: AppStateType) => store.positions.list
    );
    useEffect(() => {
        dispatch(getPositions());
    }, []);
    const positionOptions = useMemo(() => {
        let options = new Array<OptionTypeValueNumber>();
        positions.map(p => options.push({ label: p.title, value: p.id, isLast: (positions.indexOf(p) === positions.length - 1) }));
        return options;
    }, [positions])

    return (
        <StyledSelect
            border={false}
            classNamePrefix="Select"
            styles={SingleSelectCustomStyles}
            className={error ? "error" : ""}
            options={positionOptions.map(x =>
                positionOptions.indexOf(x) === positionOptions.length - 1 ?
                    { ...x, isLast: true }
                    : { ...x, isLast: false }
            )}
            menuPlacement="auto"
            onChange={(newValue, action) => {
                onChange((newValue as OptionTypeValueNumber).label);
            }}
            onBlur={onBlur}
            value={
                positionOptions
                    ? positionOptions.find(
                        (o: OptionTypeValueNumber) => o.label === value
                    )
                    : undefined
            }
            ref={ref}
        />
    );
};
export default React.forwardRef(PlayerPositionComponent)