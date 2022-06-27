import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import ImageService from "api/imageServise";
import TeamService from "api/teams/teamService";
import DragDropFile from "common/components/DragDropFile";
import { StyledFlex } from "common/components/Flex";
import { StyledLink } from "common/components/Link/styledLink";
import { AppStateType } from "core/redux/configureStore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "common/components/Input/Input";
import { actions } from "../teamReducer";
import { errorActions } from "core/redux/errorSlice";
import {
  StyledHeaderContainer,
  StyledMainContainer,
} from "modules/interface/StyledEditComponents";
import * as Info from "modules/interface/InfoComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import { requestTeam } from "../helpers/teamHelper";

const TeamEdit = () => {
  const team = useSelector((state: AppStateType) => state.team.team);
  const [initialState, setInitialState] = useState<TeamDto | null>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    getValues,
    setValue
  } = useForm<TeamDto>();

  useEffect(() => {
    if (!id) dispatch(actions.setTeam(new TeamDto()));
    else {
      let teamId = parseInt(id);
      if (teamId > 0) requestTeam(teamId, dispatch, navigate);
    }
  }, [id]);
  useEffect(()=>{
    setInitialState(team)
    setFormValues(team)
  },[team])
  function setFormValues(team: TeamDto | null) {
    reset({
      name: team?.name,
      division: team?.division,
      conference: team?.conference,
      foundationYear: team?.foundationYear,
      imageUrl: team?.imageUrl
    })
  }
  const baseUrl = process.env.REACT_APP_IMAGEURL;
  const handleFiles = (file: File) => {    
    ImageService.saveImage(file)?.then((url: string) => {
      dispatch(actions.setTeamImage(baseUrl+url));
      console.log(url);
    }).catch(e=>dispatch(errorActions.setErrorMessage(e.message)));
  };

  const removeImageOnServer=(url:string)=>{
    ImageService.deleteImage(url)?.then((url: string) => {
      console.log("Removed image url:"+ url)
    });
  }

  const onSubmit = (data: TeamDto) => {
    if(!isDirty) return
    console.log(data);
    let teamId=parseInt(id??"0")
    if (teamId) {
      TeamService.updateTeam(data)!
        .then((response: TeamDto) => {
          dispatch(actions.setTeam(response))
          if(initialState) removeImageOnServer(initialState.imageUrl)
        })
        .catch((err: any) => dispatch(errorActions.setErrorMessage(err.message)));
    } else{
      let newTeam={
        name:data.name, 
        division:data.division,
        conference: data.conference,
        imageUrl: data.imageUrl,
        foundationYear: data.foundationYear

      } as NewTeamDto
      TeamService.addTeam(newTeam)!
        .then((response: TeamDto) => {
          dispatch(actions.setTeam(response as TeamDto))
          navigate("/teams")
        })
        .catch((err: any) => {
          dispatch(errorActions.setErrorMessage(err.message))
        });
      }
  };
  const onCancel=()=>{    
    if(getValues("imageUrl") != initialState?.imageUrl) {
      removeImageOnServer(getValues("imageUrl"))
    }
    setFormValues(initialState as TeamDto)
  }

  return (
    <StyledFlex direction="column">
        <StyledHeaderContainer>
          <span className="headerText">
            <StyledLink to="/teams">Teams</StyledLink>
            <span> / </span>
            <span>{id ? "Edit team" : "Add new team"}</span>
          </span>
        </StyledHeaderContainer>
        <StyledMainContainer>
          <div>
            <DragDropFile handleFiles={handleFiles} url={team?.imageUrl} />
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p>Name</p>
                <Input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: 30,
                  })}
                  error={errors.name?.message}
                />
              </div>
              <div>
                <p>Division</p>
                <Input
                  type="text"
                  {...register("division",                  
                  {
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
              <StyledFlex>
              <StyledButton mode="cancel" type="button" onClick={onCancel}>Cancel</StyledButton>
                <StyledButton type="submit">Save</StyledButton>
              </StyledFlex>
            </form>
          </div>
        </StyledMainContainer>
    </StyledFlex>
  );
};

export default TeamEdit;
