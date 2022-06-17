import { StyledFlex } from "common/components/Flex";
import { AppStateType } from "core/redux/configureStore";
import { SelectHTMLAttributes, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { requestPlayer, requestTeamOptions, TeamOptionType } from "../helpers/playerHelper";
import * as Info from "modules/interface/InfoComponents";
import { playerActions } from "../actions";
import { PlayerDto } from "api/Dto/playerDto";
import PlayerService from "api/players/playerService";
import Input from "common/components/Input/Input";
import Select from "react-select";
import { PositionDto } from "api/Dto/positionDto";
import { InputActionMeta, OptionProps } from "react-select";
import DragDropFile from "common/components/DragDropFile";
import ImageService from "api/imageServise";
import { StyledLink } from "common/components/Link/styledLink";

interface PropTypeInterface {}

const PlayerEdit: React.FunctionComponent<PropTypeInterface> = (
  props: PropTypeInterface
) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [file, setFile] = useState(null);
  const [positions, setPositions] = useState<PositionDto[] | null>(null);
  const [positionsOption, setPositionsOption] = useState<OptionProps[] | null>( null );
  const [teamNames, setTeamNames] = useState<TeamOptionType[] | undefined>( undefined );
  const player = useSelector((state: AppStateType) => state.player.player);

  useEffect(() => {
    PlayerService.getPositions()?.then((res) => {
      setPositions(res as PositionDto[]);
    });

    requestTeamOptions(setTeamNames)
  }, []);

  useEffect(() => {
    if (!id) dispatch(playerActions.getPlayer(new PlayerDto()));
    else {
      let playerId = parseInt(id);
      if (playerId > 0) requestPlayer(playerId, dispatch);
    }
  }, [id]);

  const handleChange = (file: any) => {
    setFile(file);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!player) return;

    /*let playerId = parseInt(id);
    if(playerId == 0) PlayerService.addPlayer(player).then(res=>{  }).catch(err => console.log(err));        
    else PlayerService.updatePlayer(player).then(res=>{  }).catch(err => console.log(err)); 
    */
  };
  const onNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    dispatch(playerActions.setName(e.currentTarget.value));
  };

  const onPositiondChange = (e: any): void => {
    dispatch(playerActions.setPosition(e.value));
  };

  const onNumberChange = (e: any): void => {
    dispatch(playerActions.setNumber(e.target.value));
  };

  const onHeightChange = (e: any): void => {
    dispatch(playerActions.setHeight(e.target.value));
  };

  const onWeightChange = (e: any): void => {
    dispatch(playerActions.setWeight(e.target.value));
  };

  const onBirthdayChange = (e: any): void => {
    dispatch(playerActions.setBirthday(e));
  };
  const onTeamChange = (e:any) =>{
    dispatch(playerActions.setTeamId(e.value));
  }

  function ab2str(buf: ArrayBuffer) {
    return new TextDecoder().decode(buf);
  }
  const handleFiles = async (file: File) => {
    console.log(file);
    const content = await file.arrayBuffer();
    ImageService.saveImage(ab2str(content))?.then((url: string) => {
      dispatch(playerActions.setAvatar(url));
      console.log(url);
    });
  };

  return (
    <StyledFlex direction="row">
      <StyledFlex direction="column">
        <Info.StyledHeaderContainer>
          <span className="headerText">
          <StyledLink to="/players">Players</StyledLink>
            <span> / </span>
            <span>{id ? "Edit player" : "Add new player"}</span>
          </span>
        </Info.StyledHeaderContainer>
        <StyledFlex direction="row">
          <div>
            <DragDropFile handleFiles={handleFiles} url={player?.avatarUrl}/>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <p>Name</p>
                <Input
                  type="text"
                  name="name"
                  value={player?.name}
                  onChange={onNameChange}
                />
              </div>
              <div>
                <p>Position</p>
                <Select
                  options={[{ label: "1", value: "1" }]}
                  value={{ label: "1", value: "1" }}
                  onChange={(e) => onPositiondChange(e)}
                  inputValue={""}
                  onInputChange={function (
                    newValue: string,
                    actionMeta: InputActionMeta
                  ): void {
                  }}
                  onMenuOpen={function (): void {
                  }}
                  onMenuClose={function (): void {
                  }}
                />
              </div>
              <div>
                <p>Team</p>
                <Select options={teamNames} onChange={(e) => onTeamChange(e)} />
              </div>
              <StyledFlex>
              <div>
                <p>Height(cm)</p>
                <Input type="number" id="height" value={player?.height} onChange={onHeightChange}/>
              </div>
              <div>
                <p>Weight(kg)</p>
                <Input type="number" id="weight" value={player?.weight} onChange={onWeightChange}/>
              </div>
              </StyledFlex>
              <StyledFlex>
              <div>
                <p>Birthday</p>
                <Input type="text" id="birthday" onChange={onBirthdayChange}/>
              </div>
              <div>
                <p>Number</p>
                <Input type="number" id="number" value={player?.number} onChange={onNumberChange}/>
              </div>
              </StyledFlex>
            </form>
          </div>
        </StyledFlex>
      </StyledFlex>
    </StyledFlex>
  );
};

export default PlayerEdit;
