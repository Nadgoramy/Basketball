import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import ImageService from "api/imageServise";
import DragDropFile from "common/components/DragDropFile";
import { StyledFlex } from "common/components/Flex";
import { StyledLink } from "common/components/Link/styledLink";
import { AppStateType } from "core/redux/configureStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "common/components/Input/Input";
import { errorActions } from "core/redux/errorSlice";
import {
  StyledHeaderContainer,
  StyledMainContainer,
} from "modules/interface/StyledEditComponents";
import { StyledButton } from "common/components/Button/Button.styled";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { addTeam, getTeam, teamActions, updateTeam } from "../hooks/teamSlice";
import { StyledFlexRow } from "modules/interface/EditComponents";

const TeamEdit = () => {
  const team = useAppSelector((state: AppStateType) => state.team.team);
  const operationSecceded = useAppSelector((state: AppStateType) => state.team.operationSucceded);
  const [initialState, setInitialState] = useState<TeamDto | null>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [file, setFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string| undefined>(undefined);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    getValues,
    setValue
  } = useForm<TeamDto>();

  const error = useAppSelector((store) => store.player.error);
  useEffect(() => {
    console.log(error);
    dispatch(errorActions.setErrorMessage(error));
  }, [error]);

  useEffect(() => {
    if (id  && parseInt(id)>0) {
       dispatch(getTeam(parseInt(id)));
    }   
    else{
      dispatch(teamActions.setTeam({} as TeamDto));
    }
  }, []);
  useEffect(()=>{
    setInitialState(team)
    setFormValues(team)
    setCurrentImageUrl(team?.imageUrl)
  },[team])

  useEffect(()=>{
    if(operationSecceded) redirect()
  },[operationSecceded])

  function setFormValues(team: TeamDto | null) {
    reset({
      id: team?.id,
      name: team?.name,
      division: team?.division,
      conference: team?.conference,
      foundationYear: team?.foundationYear,
      imageUrl: team?.imageUrl
    })
  }
  
  const handleFiles = (file: File) => {    
    removeImageIfNeeded()
    ImageService.saveImage(file)?.then((url: string) => {
      dispatch(teamActions.setTeamImage(url));
      console.log(url);
      setCurrentImageUrl(url)
    }).catch(e=>dispatch(errorActions.setErrorMessage(e.message)));
  };

  
  const onSubmit = (data: TeamDto) => {
    if(!isDirty) return
    console.log(data);
    let teamId=parseInt(id??"0")
    if (teamId) {
      dispatch(updateTeam(data))      
    } else{
      dispatch(addTeam(data))
      }     
  };
  const onCancel=()=>{    
    removeImageIfNeeded()
    redirect()
  }
  const removeImageIfNeeded=()=>{
    if(id=="0" && currentImageUrl) removeImageOnServer(currentImageUrl)
    if(currentImageUrl && initialState?.imageUrl && currentImageUrl != initialState.imageUrl)
      removeImageOnServer(currentImageUrl)
  }  
  const removeImageOnServer=(url:string)=>{
    ImageService.deleteImage(url)?.then((url: string) => {
      console.log("Removed image url:"+ url)
    });
  }
  const redirect=()=>{
    if (id && parseInt(id) > 0) {
      navigate("/teams/" + id);
    } else navigate("/teams");
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
            <DragDropFile handleFiles={handleFiles} url={currentImageUrl} />
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
              <StyledFlexRow>
              <StyledButton mode="cancel" type="button" onClick={onCancel}>Cancel</StyledButton>
                <StyledButton type="submit">Save</StyledButton>
              </StyledFlexRow>
              <Input type="hidden" {...register("imageUrl")} />
              <Input type="hidden" {...register("id")} />
            </form>
          </div>
        </StyledMainContainer>
    </StyledFlex>
  );
};

export default TeamEdit;
