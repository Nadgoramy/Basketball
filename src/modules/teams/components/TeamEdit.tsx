import { TeamDto } from "api/Dto/teamDto";
import { ImageService } from "api/requests/imageServise";
import { DragDropFile } from "common/components/DragDropFile";
import { StyledFlex } from "common/components/Flex";
import { StyledLink } from "common/components/Link/styledLink";
import { AppStateType } from "core/redux/configureStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "common/components/Input/Input";
import {
  StyledHeaderContainer,
  StyledMainContainer,
} from "common/components/StyledEditComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { addTeam, getTeam, teamActions, updateTeam } from "../hooks/teamSlice";
import { StyledFlexRow } from "common/components/EditComponents";
import { teamsActions } from "modules/teams/hooks/teamsPageSlice";
import { useAPIError } from "common/hooks/useApiError";
import { IError } from "common/hooks/apiErrorProvider";

export const TeamEdit = () => {
  const team = useAppSelector((state: AppStateType) => state.team.team);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(
    undefined
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setValue,
  } = useForm<TeamDto>();

  const { addError } = useAPIError();
  const error = useAppSelector((store: AppStateType) => store.player.error);
  useEffect(() => {
    if (error) addError(error);
  }, [error]);

  useEffect(() => {
    if (id && parseInt(id) > 0) {
      dispatch(getTeam(parseInt(id)));
    } else {
      dispatch(teamActions.setTeam(emptyTeam));
    }
  }, []);
  useEffect(() => {
    setFormValues(team);
    setCurrentImageUrl(team?.imageUrl);
  }, [team]);

  const emptyTeam: TeamDto = {
    name: "",
    division: "",
    conference: "",
    foundationYear: 2000,
    imageUrl: "",
    id: 0,
    players: [],
  };

  function setFormValues(team?: TeamDto) {
    reset({
      id: team?.id,
      name: team?.name,
      division: team?.division,
      conference: team?.conference,
      foundationYear: team?.foundationYear,
      imageUrl: team?.imageUrl,
    });
  }

  const handleFiles = (file: File) => {
    removeImageIfNeeded();
    ImageService.saveImage(file)
      ?.then((url: string) => {
        console.log(url);
        setCurrentImageUrl(url);
        setValue("imageUrl", url, { shouldDirty: true });
      })
      .catch((e) => {
        let err = e as IError;
        if (err.message) addError(err.message);
      });
  };

  const onSubmit = (data: TeamDto) => {
    if (!isDirty) return;

    const teamId = parseInt(id ?? "0");
    if (teamId) {
      dispatch(updateTeam(data)).then(() => {
        onSubmitted(teamId);
      });
    } else {
      dispatch(addTeam(data)).then((params) => {
        onSubmitted((params.payload as TeamDto).id);
      });
    }
  };

  const onSubmitted = (id: number) => {
    dispatch(teamsActions.clearState());
    dispatch(teamActions.clearState());
    navigate("/teams/" + id);
  };

  const onCancel = () => {
    removeImageIfNeeded();
    //setFormValues(team);
    navigate(-1);
  };
  const removeImageIfNeeded = () => {
    if (id == "0" && currentImageUrl) removeImageOnServer(currentImageUrl);
    if (currentImageUrl && team?.imageUrl && currentImageUrl != team.imageUrl)
      removeImageOnServer(currentImageUrl);
  };
  const removeImageOnServer = (url: string) => {
    ImageService.deleteImage(url)?.then((url: string) => {
      setCurrentImageUrl(team.imageUrl);
    });
  };

  return (
    <StyledFlex direction="column">
      <StyledHeaderContainer>
        <span className="headerText">
          <StyledLink to="/teams">Teams</StyledLink>
          <span> / </span>
          <span>{id && parseInt(id) > 0 ? "Edit team" : "Add new team"}</span>
        </span>
      </StyledHeaderContainer>
      <StyledMainContainer>
        <div>
          <DragDropFile handleFiles={handleFiles} url={currentImageUrl} />
        </div>
        <div>
          <form onSubmit={handleSubmit((e) => onSubmit(e as TeamDto))}>
            <div>
              <p>Name</p>
              <Input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 80,
                    message: "Maximum length is 80",
                  },
                })}
                error={errors.name?.message}
              />
            </div>
            <div>
              <p>Division</p>
              <Input
                type="text"
                {...register("division", {
                  required: "Division is required",
                  maxLength: 30,
                })}
                error={errors.division?.message}
              />
            </div>
            <div>
              <p>Conference</p>
              <Input
                type="text"
                {...register("conference", {
                  required: "Conference is required",
                  maxLength: 30,
                })}
                error={errors.conference?.message}
              />
            </div>

            <div>
              <p>Year of foundation</p>
              <Input
                type="number"
                {...register("foundationYear", {
                  required: "Year of foundation is required",
                  maxLength: 30,
                })}
                error={errors.foundationYear?.message}
              />
            </div>
            <StyledFlexRow>
              <StyledButton mode="cancel" type="button" onClick={onCancel}>
                Cancel
              </StyledButton>
              <StyledButton type="submit">Save</StyledButton>
            </StyledFlexRow>
            <input type="hidden" {...register("imageUrl")} />
            <input type="hidden" {...register("id")} />
          </form>
        </div>
      </StyledMainContainer>
    </StyledFlex>
  );
};
