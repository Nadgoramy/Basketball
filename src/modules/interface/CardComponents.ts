import styled from "styled-components";

export const StyledContainer = styled.div`
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: inline-block;
  position: relative;
  border-radius: 4px;
`;
export const StyledTeamImageContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 65px 107px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: absolute;
    width: 58.4px;
    height: 50.68px;
    left: 56.34px;
    top: 31.59px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const StyledPlayerImageContainer = styled.div`
  width: 274px;
  height: 207px;
  margin: 73px 45px 0 45px;
  position: relative;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: absolute;
    width: 121.5px;
    height: 92.62px;
    left: 24px;
    top: 11px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type ImgType = {
  url: string | undefined;
};
export const StyledImageDiv = styled.div<ImgType>`
  background-image: linear-gradient(red, yellow);
  background-image: url("${(props: ImgType) => props.url}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const StyledFooter = styled.div`
  position: absolute;
  height: 100px;
  bottom: 0;
  width: 100%;
  background: #303030;
  border-radius: 0px 0px 4px 4px;
  color: fff;
  text-align: center;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #9c9c9c;
  }
  h4 {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: #ffffff;
    margin-bottom: 8px;

    span {
      color: #e4163a;
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      margin-bottom: 8px;
    }
  }
`;
