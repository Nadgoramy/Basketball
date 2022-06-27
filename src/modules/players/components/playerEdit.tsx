import { StyledFlex } from "common/components/Flex";
import { AppStateType } from "core/redux/configureStore";
import { SelectHTMLAttributes, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import { playerActions } from "../actions";
import {
  playerActions,
  getPlayer,
  updatePlayer,
  addPlayer,
} from "../hooks/playerSlice";
import { PlayerDto } from "api/Dto/playerDto";
import Input from "common/components/Input/Input";
import DragDropFile from "common/components/DragDropFile";
import ImageService from "api/imageServise";
import { StyledLink } from "common/components/Link/styledLink";
import { Controller, useForm } from "react-hook-form";
import {
  StyledHeaderContainer,
  StyledMainContainer,
} from "modules/interface/StyledEditComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { getPositions } from "../hooks/positionSlice";
import { getTeamOptions } from "../hooks/teamOptionSlice";
import {
  OptionTypeValueNumber,
  OptionTypeValueString,
  StyledSelect,
} from "common/components/StyledSelect";
import { number } from "prop-types";
import {
  StyledFlexAutoDiv,
  StyledFlexRow,
} from "modules/interface/EditComponents";

interface PropTypeInterface {}
type PlayerForm = {
  userName: string;
  login: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const PlayerEdit: React.FunctionComponent<PropTypeInterface> = (
  props: PropTypeInterface
) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [file, setFile] = useState(null);
  const positionOptions = useAppSelector((store) => store.positions.options);
  const teamOptions = useAppSelector((store) => store.teamOptions.options);
  const player = useAppSelector((state: AppStateType) => state.player.player);
  const [initialState, setInitialState] = useState<PlayerDto | null>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    getValues,
    control,
    watch,
  } = useForm<PlayerDto>();
  const error = useAppSelector((store) => store.player.error);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (positionOptions.length == 0) dispatch(getPositions()); //
    if (teamOptions.length == 0) dispatch(getTeamOptions());
  }, []);
  useEffect(() => {
    console.log(positionOptions);
  }, [positionOptions]);

  useEffect(() => {
    if (id) {
      let playerId = parseInt(id);
      if (playerId > 0) dispatch(getPlayer(playerId));
    }
  }, [id]);

  useEffect(() => {
    setInitialState(player);
    setFormValues(player);
  }, [player]);

  const handleChange = (file: any) => {
    setFile(file);
  };

  const handleFiles = (file: File) => {
    ImageService.saveImage(file)?.then((url: string) => {
      dispatch(playerActions.setPlayerPhoto(url));
      console.log(url);
    });
  };
  const onCancel = () => {
    let currentAvatarUrl = getValues("avatarUrl");
    if (currentAvatarUrl && currentAvatarUrl != initialState?.avatarUrl) {
      removeImageOnServer(currentAvatarUrl);
    }
    setFormValues(initialState as PlayerDto);
  };
  const removeImageOnServer = (url: string) => {
    ImageService.deleteImage(url)?.then((url: string) => {
      console.log("Removed image url:" + url);
    });
  };
  function setFormValues(player: PlayerDto | null) {
    reset({
      name: player?.name,
      birthday: player?.birthday,
      height: player?.height,
      weight: player?.weight,
      avatarUrl: player?.avatarUrl,
    });
  }
  const onSubmit = (data: any) => {
    let updatedPlayer = {
      id: id,
      name: data.name,
      birthday: data.birthday,
      height: data.height,
      weight: data.weight,
      avatarUrl: data.avatarUrl,
      number: data.number,
      team: typeof data.team == "number" ? data.team : data.team?.value,
      position:
        typeof data.position == "string" ? data.position : data.position?.value,
    };
    console.log(JSON.stringify(updatedPlayer, null, 4));

    if (id && parseInt(id) > 0)
      dispatch(updatePlayer(updatedPlayer as PlayerDto));
    else dispatch(addPlayer(updatedPlayer as PlayerDto));
  };
  const values = watch();
  return (
    <StyledFlex>
      <StyledFlexAutoDiv>
        <StyledHeaderContainer>
          <span className="headerText">
            <StyledLink to="/players">Players</StyledLink>
            <span> / </span>
            <span>
              {id && parseInt(id) > 0 ? "Edit player" : "Add new player"}
            </span>
          </span>
        </StyledHeaderContainer>
        <StyledMainContainer>
          <div>
            <DragDropFile handleFiles={handleFiles} url={player?.avatarUrl} />
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p>Name</p>
                <Input
                  type="text"
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Name is required",
                    maxLength: 30,
                  })}
                />
              </div>
              <div>
                <p>Position</p>
                <Controller
                  control={control}
                  name="position"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <StyledSelect
                      classNamePrefix={
                        "Select" + (errors.position ? "error" : null)
                      }
                      id={name}
                      options={positionOptions}
                      defaultValue={undefined}
                      menuPlacement="auto"
                      onChange={(val: any, action) => onChange(val.value) }
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                    />
                  )}
                />
              </div>
              <div>
                <p>Team</p>
                <Controller
                  control={control}
                  name="team"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <StyledSelect
                    classNamePrefix={
                      "Select" + (errors.position ? "error" : null)
                    }
                      options={teamOptions}
                      defaultValue={undefined}
                      menuPlacement="auto"
                      onChange={(val: any, action) => onChange(val.value)}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                    />
                  )}
                />
              </div>
              <StyledFlexRow>
                <div>
                  <p>Height(cm)</p>
                  <Input
                    type="number"
                    error={errors.height?.message}
                    {...register("height", {
                      required: "Height is required",
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div>
                  <p>Weight(kg)</p>
                  <Input
                    type="number"
                    error={errors.weight?.message}
                    {...register("weight", {
                      required: "Weight is required",
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </StyledFlexRow>
              <StyledFlexRow>
                <div>
                  <p>Birthday</p>
                  <Input
                    type="text"
                    error={errors.birthday?.message}
                    {...register("birthday", {
                      required: "Birthday is required",
                      valueAsDate: true,
                    })}
                  />
                </div>
                <div>
                  <p>Number</p>
                  <Input
                    type="number"
                    error={errors.number?.message}
                    {...register("number", {
                      required: "Number is required",
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </StyledFlexRow>
              <StyledFlexRow>
                <StyledButton mode="cancel" type="button" onClick={onCancel}>
                  Cancel
                </StyledButton>
                <StyledButton type="submit">Save</StyledButton>
              </StyledFlexRow>
              <Input type="hidden" {...register("avatarUrl")} />
              <Input type="hidden" {...register("id")} />
            </form>
          </div>
        </StyledMainContainer>
      </StyledFlexAutoDiv>
    </StyledFlex>
  );
};

export default PlayerEdit;
