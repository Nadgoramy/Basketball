import { AppStateType } from "core/redux/configureStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  playerActions,
  getPlayer,
  updatePlayer,
  addPlayer,
} from "../hooks/playerSlice";
import { PlayerDto } from "api/Dto/playerDto";
import { Input } from "common/components/Input/Input";
import { DragDropFile } from "common/components/DragDropFile";
import { ImageService } from "api/requests/imageServise";
import { StyledLink } from "common/components/Link/styledLink";
import { Controller, useForm } from "react-hook-form";
import {
  StyledEditContainer,
  StyledHeaderContainer,
  StyledMainContainer,
} from "common/components/StyledEditComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { getPositions } from "../hooks/positionSlice";
import { getTeamOptions } from "../hooks/teamOptionSlice";
import {
  OptionTypeValueNumber,
  OptionTypeValueString,
  StyledSelect,
} from "common/components/StyledSelect";
import {
  StyledFlexAutoDiv,
  StyledFlexRow,
} from "common/components/EditComponents";
import { useNavigate } from "react-router-dom";
import { BirthdayCalendarInput } from "common/components/BirthdayCalendarInput";
import { ErrorInputSpan } from "common/components/ErrorInputSpan";
import { Preloader } from "common/components/preloader";
import { playersActions } from "../hooks/playersPageSlice";
import { useAPIError } from "common/hooks/useApiError";

export const PlayerEdit: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | undefined>(
    undefined
  );
  const positionOptions = useAppSelector(
    (store: AppStateType) => store.positions.options
  );
  const teamOptions = useAppSelector(
    (store: AppStateType) => store.teamOptions.options
  );
  const player = useAppSelector((state: AppStateType) => state.player.player);

  const isFetching = useAppSelector((store) => store.player.isFetching);
  const [initialState, setInitialState] = useState<PlayerDto | null>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setValue,
    control,
    watch,
  } = useForm<PlayerDto>();

  const emptyPlayer: PlayerDto = {
    name: "",
    avatarUrl: "",
    height: 0,
    weight: 0,
    number: 0,
    birthday: undefined,
  };

  const error = useAppSelector((store) => store.player.error);
  const { addError } = useAPIError();
  useEffect(() => {
    if (error) addError(error);
  }, [error]);

  useEffect(() => {
    dispatch(playerActions.setPlayer(emptyPlayer));
    dispatch(getPositions());
    dispatch(getTeamOptions());
  }, []);

  useEffect(() => {
    if (id) {
      const playerId = parseInt(id);
      if (playerId > 0) dispatch(getPlayer(playerId));
      if (playerId == 0) {
        dispatch(playerActions.setPlayer(emptyPlayer));
        setFormValues(emptyPlayer);
      }
    }
  }, [id]);

  useEffect(() => {
    setInitialState(player);
    setFormValues(player);
    setCurrentAvatarUrl(player?.avatarUrl);
  }, [player]);

  const handleFiles = (file: File) => {
    removeImageIfNeeded();

    ImageService.saveImage(file)?.then((url: string) => {
      setValue("avatarUrl", url, { shouldDirty: true });
      setCurrentAvatarUrl(url);
      console.log(url);
    });
  };

  const removeImageIfNeeded = () => {
    if (id == "0" && currentAvatarUrl) removeImageOnServer(currentAvatarUrl);
    if (
      currentAvatarUrl &&
      initialState?.avatarUrl &&
      currentAvatarUrl != initialState.avatarUrl
    )
      removeImageOnServer(currentAvatarUrl);
  };
  const removeImageOnServer = (url: string) => {
    return ImageService.deleteImage(url)?.then((res: any) => {
      setCurrentAvatarUrl(player.avatarUrl);
    });
  };

  function setFormValues(player?: PlayerDto) {
    reset({
      id: player?.id,
      name: player?.name,
      birthday: player?.birthday,
      height: player?.height,
      weight: player?.weight,
      avatarUrl: player?.avatarUrl,
      number: player?.number,
      position: player?.position,
      team: player?.team,
    });
  }

  const onSubmit = (data: any) => {
    if (!isDirty) {
      return;
    }
    if (id && parseInt(id) > 0)
      dispatch(updatePlayer(data as PlayerDto)).then(() => onSubmited(parseInt(id)));
    else dispatch(addPlayer(data as PlayerDto)).then((res) => onSubmited((res.payload as PlayerDto).id));
  };
  const onSubmited = (id?: number) => {
    if (id) {
      dispatch(playersActions.clearState());
      dispatch(playerActions.clearState());
      navigate("/players/" + id);
    }
  };

  const onCancel = () => {
    removeImageIfNeeded();
    navigate(-1);
  };
  const values = watch();
  return (
    <StyledEditContainer>
      {isFetching && <Preloader />}
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
            <DragDropFile handleFiles={handleFiles} url={currentAvatarUrl} />
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
                    maxLength: {
                      value: 80,
                      message: "Maximum length is 80",
                    },
                  })}
                />
              </div>
              <div>
                <p>Position</p>
                <Controller
                  control={control}
                  name="position"
                  rules={{
                    required: "Position is required",
                  }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <StyledSelect
                      border={false}
                      classNamePrefix="Select"
                      className={errors.position ? "error" : ""}
                      id={name}
                      options={positionOptions}
                      menuPlacement="auto"
                      onChange={(newValue, _) => {
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
                  )}
                />
                {errors.position && (
                  <ErrorInputSpan>{errors.position.message}</ErrorInputSpan>
                )}
              </div>
              <div>
                <p>Team</p>
                <Controller
                  control={control}
                  rules={{
                    required: "Team is required",
                  }}
                  name="team"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <StyledSelect
                      border={false}
                      classNamePrefix="Select"
                      className={errors.position ? "error" : ""}
                      options={teamOptions}
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
                  )}
                />
                {errors.team && (
                  <ErrorInputSpan>{errors.team.message}</ErrorInputSpan>
                )}
              </div>
              <StyledFlexRow>
                <div>
                  <p>Height (cm)</p>
                  <Input
                    type="number"
                    error={errors.height?.message}
                    {...register("height", {
                      required: "Height is required",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Negative value is not allowed",
                      },
                    })}
                  />
                </div>
                <div>
                  <p>Weight (kg)</p>
                  <Input
                    type="number"
                    error={errors.weight?.message}
                    {...register("weight", {
                      required: "Weight is required",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Negative value is not allowed",
                      },
                    })}
                  />
                </div>
              </StyledFlexRow>
              <StyledFlexRow>
                <div>
                  <p>Birthday</p>

                  <Controller
                    control={control}
                    name="birthday"
                    rules={{
                      required: "Birthday is required",
                    }}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <BirthdayCalendarInput
                        name={name}
                        selected={value}
                        error={errors.birthday?.message}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
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
                      min: {
                        value: 0,
                        message: "Negative value is not allowed",
                      },
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
              <input type="hidden" {...register("avatarUrl")} />
              <input type="hidden" {...register("id")} />
            </form>
          </div>
        </StyledMainContainer>
      </StyledFlexAutoDiv>
    </StyledEditContainer>
  );
};
