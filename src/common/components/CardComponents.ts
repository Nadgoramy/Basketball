import styled from "styled-components";
import { themeColors } from "ThemeColors";

export const StyledContainer = styled.div`
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: inline-block;
  position: relative;
  border-radius: 4px;
`;
export const StyledTeamImageContainer = styled.div<PhotoPropsType>`
  width: 100%;
  height: 150px;
  margin: 65px auto;
  position: relative;
  background-image: url("${(props) => props.url}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 32px 55px;
    width: 58px;
    height: 50px;
    background-position: center;
    width: 100%;
    margin: 32px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type PhotoPropsType = { url?: string };
export const StyledPlayerImageContainer = styled.div<PhotoPropsType>`
  height: 207px;
  width: 100%;
  margin: 73px auto 0 auto;
  position: relative;
  background-image: url("${(props) => props.url}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: bottom;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    background-position: center;
    height: 93px;
    margin: 11px auto 0 auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const StyledFooter = styled.div`
  position: absolute;
  height: 100px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${themeColors.dark_grey};
  border-radius: 0px 0px 4px 4px;
  color: ${themeColors.white};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 76px;
  }

  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 20px;
    margin-bottom: 12px;
    
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${themeColors.white};

    width: 90%;
    max-height: 44px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
      margin-top: 14px;
      margin-bottom: 0px;

      margin-top: 0px;
      margin-bottom: 4px;
    }
  }

  h5{
    text-overflow: ellipsis;
    margin: 0 auto;
    width: 90%;
    word-break: break-all;
    max-height: 24px;
    overflow: hidden;

    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: ${themeColors.light_grey};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 13px;
      line-height: 18px;
      max-height: 18px;
    }
  }
`;

export const StyledTeamFooter = styled(StyledFooter)` 
  gap: 4px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 94px;
  }

  h4 {
    //margin-top: 0px;
    text-overflow: ellipsis;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-top: 0px;
      margin-bottom: 4px;
    }
  }
  h5 {
    text-overflow: ellipsis;
  }
  span{
    width:95%;
    overflow: hidden;
  }
`;
export const StyledPlayerFooter = styled(StyledFooter)`
  h4 {    
    text-overflow: ellipsis;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-top: 0px;
      margin-bottom: 4px;
    }
  }
  h5 {
    text-overflow: ellipsis;
    margin-bottom:4px;
  }
  span.number{
    color: ${themeColors.red};
  }
`;


/*
span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: ${themeColors.light_grey};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 13px;
      line-height: 18px;
    }
  } 
  h4 {
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${themeColors.white};

    width: 90%;
    max-height: 44px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
      margin-top: 14px;
      margin-bottom: 0px;

      margin-top: 0px;
      margin-bottom: 4px;
    }

    span {
      color: ${themeColors.red};
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 8px;
    }
  }
  */