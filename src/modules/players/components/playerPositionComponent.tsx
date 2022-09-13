import { PositionDto } from "api/Dto/positionDto";
import { PlayerService } from "api/players/playerService";
import { OptionTypeValueNumber, OptionTypeValueString, SingleSelectCustomStyles, StyledSelect } from "common/components/StyledSelect";
import { AppStateType } from "core/redux/configureStore";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import React from "react";
import { useEffect, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { getPositions } from "../hooks/positionSlice";

type PlayerPositionComponentProps = {
    error?: string
} & ControllerRenderProps
async function LoadPositions() {
    let responce = await PlayerService.getPositions();
    if (responce) {
        return responce;
    }
}

const PlayerPositionComponent = (props: PlayerPositionComponentProps, ref: any) => {
    const { error, onChange, onBlur, value } = props;


    const dispatch = useAppDispatch()
    const positionOptions = useAppSelector(
        (store: AppStateType) => store.positions.options
    );
    useEffect(() => {

        dispatch(getPositions());
    }, []);

    /*
    let positions: Array<OptionTypeValueNumber> = new Array<OptionTypeValueNumber>();
    useEffect(() => {
        if (positions.length == 0) {
            LoadPositions().then(responce => {
                if (!responce) { return }
                //let options = new Array<OptionTypeValueNumber>();
                responce.map((t: PositionDto) => {
                    if (!positions.find(x => x.value == t.id)) {
                        positions.push({ label: t.title, value: t.id })
                    }
                }
                );

                positions.forEach(x => x.isLast = positions.indexOf(x) === positions.length - 1)
                //positions = options
                console.log(positions);
            })
        }
    }, []);*/

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
                onChange((newValue as OptionTypeValueString).value);
            }}
            onBlur={onBlur}
            value={
                positionOptions
                    ? positionOptions.find(
                        (o: OptionTypeValueString) => o.value == value
                    )
                    : undefined
            }
            ref={ref}
        />
    );
};
export default React.forwardRef(PlayerPositionComponent)