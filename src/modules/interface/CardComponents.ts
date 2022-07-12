import styled from "styled-components";

export const StyledContainer = styled.div`
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: inline-block;
  position: relative;
  border-radius: 4px;
`;
export const StyledTeamImageContainer = styled.div<PhotoPropsType>`
  width: 150px;
  height: 150px;
  margin: 65px 107px;
  position: relative;
  background-image: url("${( props ) => props.url}");
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 32px 55px;
    width: 58px;
    height: 50px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type PhotoPropsType = {url? :string}
export const StyledPlayerImageContainer = styled.div<PhotoPropsType>`
  width: 274px;
  height: 207px;
  margin: 73px auto 0 auto ;
  position: relative;
  background-image: url("${( props ) => props.url}");
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: ${({ theme }) => theme.mobile}) {    
    width: 140px;
    background-position: center;
    height:93px;
    margin: 11px auto 0 auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type ImgType = {
  url: string ;
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
  background: ${({ theme }) => theme.colors.dark_grey};
  border-radius: 0px 0px 4px 4px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 76px;
  }

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: ${({ theme }) => theme.colors.light_grey};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 13px;
      line-height: 18px;
    }
  }
  h4 {
    margin-top: 20px;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.white};
    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
      margin-top: 14px;
      margin-bottom: 0px;
    }

    span {
      color: ${({ theme }) => theme.colors.red};
      font-weight: 600;
    font-size: 18px;
    line-height: 22px;
      margin-bottom: 8px;
    }
  }
`;

export const StyledTeamFooter = styled.div`
  position: absolute;
  height: 100px;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.dark_grey};
  border-radius: 0px 0px 4px 4px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 94px;
  }

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: ${({ theme }) => theme.colors.light_grey};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 13px;
      line-height: 18px;
    }
  }
  h4 {
    margin-top: 0px;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.white};
    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
      margin-top: 0px;
      margin-bottom: 4px;
    }    
  }
`;
