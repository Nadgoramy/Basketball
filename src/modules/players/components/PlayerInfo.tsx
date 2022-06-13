import { PlayerDto } from "api/Dto/playerDto";
import PlayerService from "api/players/playerService";
import { StyledFlex } from "common/components/Flex";
import { AppStateType } from "core/redux/configureStore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { actions, getPlayer } from "../actions";

type PlayerInfoPtopType = React.HTMLAttributes<HTMLElement> & {};

export const PlayerInfo: React.FunctionComponent<PlayerInfoPtopType> = (
  props: PlayerInfoPtopType
) => {
  //const [player, setPlayer] = useState<PlayerDto >();
  const dispatch = useDispatch();
  const player = useSelector((state: AppStateType) => state.player.player);
  const params = useParams();
  let { id } = useParams();

  useEffect(() => {
    console.log(params);
    if (!id) return;
    let playerId = parseInt(id);
    requestPlayer(playerId);
  }, [id]);

  let navigate = useNavigate();
  const routeChange = (id: number) => {
    let path = `/editplayer/` + id;
    navigate(path);
  };

  const requestPlayer = (id: number) => {
    let promise = PlayerService.getPlayer(id);
    if (promise)
      promise
        .then((res) => {
          console.log(res);
          dispatch(getPlayer(res as PlayerDto));
        })
        .catch((err) => {
          console.log("err");
        });
  };

  const getAge = (birthday: Date | undefined) => {
    if (!birthday) return "";
    let age = new Date(Date.now() - new Date(birthday).getTime());
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  return (
    <StyledFlex>
      <StyledContainer>
        {!player && <div className="noPlayer"></div>}
        {player && (
          <div>
            <StyledHeaderContainer>
              <span className="headerText">
                <Link to="/players">Players</Link>
                <span> / </span>
                <span>{player.name}</span>
              </span>
              <div className="headerbuttons">
                <button>edit</button>
                <button>delete</button>
              </div>
            </StyledHeaderContainer>
            <StyledMainContainer>
              <StyledPhotoContainer url={player.avatarUrl}>
                
              </StyledPhotoContainer>
              <StyledDescriptionContainer>
                <h2>
                  {player.name} <span>#{player.number}</span>
                </h2>
                <StyledDescriptionRow>
                  <div>
                    <label>Position</label>
                    <p>{player.position}</p>
                  </div>
                  <div>
                    <label>Team</label>
                    <p>{player.teamName}</p>
                  </div>
                </StyledDescriptionRow>
                <StyledDescriptionRow>
                  <div>
                    <label>Height</label>
                    <p>{player.height}</p>
                  </div>
                  <div>
                    <label>Weight</label>
                    <p>{player.weight}</p>
                  </div>
                </StyledDescriptionRow>
                <StyledDescriptionRow>
                  <div>
                    <label>Age</label>
                    <p>{getAge(player.birthday)}</p>
                  </div>
                </StyledDescriptionRow>
              </StyledDescriptionContainer>
            </StyledMainContainer>
          </div>
        )}
      </StyledContainer>
    </StyledFlex>
  );
};

const StyledContainer = styled.div`
  max-width: 1140px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    max-width: ${({ theme }) => theme.mobile};
  }
`;
const StyledHeaderContainer = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border: 0.5px solid #9c9c9c;
  border-radius: 10px 10px 0px 0px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 69px;
  padding: 24px 32px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 48px;
    padding: 12px 16px;
    border-radius: 0;
  }
`;
const StyledMainContainer = styled.div`
  background: linear-gradient(276.45deg, #707070 0%, #393939 100.28%);
  border-radius: 0px 0px 10px 10px ;
  display: flex;
  flex-direction: row;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    flex-direction: column;
    border-radius: 0;
  }
`;
type PhotoPropsType = {url? :string}
const StyledPhotoContainer = styled.div<PhotoPropsType>`
  min-width: 587px;  
  margin-top: 180px;
  background-image: url("${( props ) => props.url}");
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    min-width: 150px;  
    min-height: 150px;
    margin: 0 auto;
    margin-top: 48px;
    background-size: contain;
  }
`;
const StyledDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  text-align: left;  
  min-width: 400px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    row-gap: 32px;
    text-align: center;
    min-width: 400px;
  }

  h2 {
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;
    color: #ffffff;
    text-align: left;
    margin-top: 65px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 17px;
      line-height: 25px;
      align-items: center;
      text-align: center;
      margin-top: 0;
    }
    span {
      color: #e4163a;
    }
  }
  label {
    font-weight: 800;
    font-size: 24px;
    line-height: 33px;
    color: #ffffff;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 17px;
      line-height: 25px;
    }
  }
  p {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: #ffffff;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
      line-height: 24px;
    }
  }
`;
const StyledDescriptionRow = styled.div`
  display: flex;
  /*flex-direction: row;
  justify-content: space-between;*/
  text-align: left;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    text-align: center;
  }
  div{
    width: 50%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }
  `