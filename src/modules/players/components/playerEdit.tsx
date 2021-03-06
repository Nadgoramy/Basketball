import { AppStateType } from "core/redux/configureStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  playerActions,
  getPlayer,
  updatePlayer,
  addPlayer,
} from "../hooks/playerSlice";
import { PlayerDto } from "api/dto/playerDto";
import Input from "common/components/Input/Input";
import DragDropFile from "common/components/DragDropFile";
import ImageService from "api/requests/imageServise";
import { StyledLink } from "common/components/Link/styledLink";
import { Controller, useForm } from "react-hook-form";
import {
  StyledEditContainer,
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
import {
  StyledFlexAutoDiv,
  StyledFlexRow,
} from "modules/interface/EditComponents";
import { errorActions } from "core/redux/errorSlice";
import { useNavigate } from "react-router-dom";
import BirthdayCalendarInput from "common/components/BirthdayCalendarInput";
import { ErrorInputSpan } from "common/components/ErrorInputSpan";
import Preloader from "common/components/preloader";

const PlayerEdit: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  let navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | undefined>(
    undefined
  );
  const positionOptions = useAppSelector((store) => store.positions.options);
  const teamOptions = useAppSelector((store) => store.teamOptions.options);
  const player = useAppSelector((state: AppStateType) => state.player.player);
  const operationSecceded = useAppSelector(
    (state: AppStateType) => state.team.operationSucceded
  );
  const isFetching = useAppSelector((store) => store.player.isFetching);
  const [initialState, setInitialState] = useState<PlayerDto | null>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    getValues,
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
  useEffect(() => {
    dispatch(errorActions.setErrorMessage(error));
  }, [error]);

  useEffect(() => {
    dispatch(playerActions.setPlayer(emptyPlayer));
    dispatch(getPositions());
    dispatch(getTeamOptions());
  }, []);

  useEffect(() => {
    if (id) {
      let playerId = parseInt(id);
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

  useEffect(() => {
    if (operationSecceded) redirect();
  }, [operationSecceded]);

  const handleChange = (file: any) => {
    setFile(file);
  };

  const handleFiles = (file: File) => {
    removeImageIfNeeded();

    ImageService.saveImage(file)?.then((url: string) => {
      setValue("avatarUrl", url);
      setCurrentAvatarUrl(url);
      console.log(url);
    });
  };
  const redirect = () => {
    /*if (id && parseInt(id) > 0) {
      navigate("/players/" + id);
    } else navigate("/players");*/
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
    ImageService.deleteImage(url)?.then((url: string) => {
      console.log("Removed image url:" + url);
    });
  };
  function setFormValues(player: PlayerDto | null) {
    reset({
      id: player?.id,
      name: player?.name,
      birthday: player?.birthday ,
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
      redirect();
      return;
    }

    if (id && parseInt(id) > 0) dispatch(updatePlayer(data as PlayerDto));
    else dispatch(addPlayer(data as PlayerDto));
  };
  const onCancel = () => {
    removeImageIfNeeded();
    redirect();
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
                    maxLength: 30,
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
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <StyledSelect
                      classNamePrefix="Select"
                      className={errors.position ? "error" : ""}
                      id={name}
                      options={positionOptions}
                      menuPlacement="auto"
                      onChange={(newValue, action) => {
                        onChange((newValue as OptionTypeValueString).value);
                      }}
                      onBlur={onBlur}
                      value={
                        positionOptions
                          ? positionOptions.find((o) => o.value == value)
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
                    required: true,
                    validate: (value) => {
                      if (!value || value < 0) {
                        return "Please provide input name";
                      }
                    },
                  }}
                  name="team"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <StyledSelect
                      classNamePrefix="Select"
                      options={teamOptions}
                      menuPlacement="auto"
                      onChange={(newValue, action) => {
                        onChange((newValue as OptionTypeValueNumber).value);
                      }}
                      onBlur={onBlur}
                      value={
                        teamOptions
                          ? teamOptions.find((o) => o.value == value)
                          : undefined
                      }
                      ref={ref}
                    />
                  )}
                />
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

export default PlayerEdit;
