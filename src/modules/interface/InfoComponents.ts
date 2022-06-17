import styled from "styled-components";


export const StyledContainer = styled.div`
max-width: 1140px;

@media (max-width: ${({ theme }) => theme.mobile}) {
  max-width: ${({ theme }) => theme.mobile};
}
`;
export const StyledHeaderContainer = styled.div`
box-sizing: border-box;
background: ${({ theme }) => theme.colors.white};
border: 0.5px solid #9c9c9c;
border-radius: 10px 10px 0px 0px;
color: ${({ theme }) => theme.colors.red};

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

a{
  textdecoration: none;
  &a:-webkit-any-link {
    textdecoration: none;
  }
}
`;
export const StyledMainContainer = styled.div`
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
export const StyledPhotoContainer = styled.div<PhotoPropsType>`
min-width: 587px;  
margin-top: 180px;
background-image: url("${( props ) => props.url}");
background-repeat: no-repeat;
background-size: contain;

@media (max-width: ${({ theme }) => theme.mobile}) {
  min-width: 150px;  
  min-height: 150px;
  margin: 0 auto;
  margin-top: 48px;
  background-size: contain;
}
`;

export const StyledLogoContainer = styled.div<PhotoPropsType>`
width: 210px;  
margin: 97px 146px;
background-image: url("${( props ) => props.url}");
background-repeat: no-repeat;
background-size: contain;

@media (max-width: ${({ theme }) => theme.mobile}) {
  width: 90px;    
  margin: 48px 143px;
  background-size: contain;
}
`;

export const StyledDescriptionContainer = styled.div`
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
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  margin-top: 65px;
  margin-bottom: 0;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 17px;
    line-height: 25px;
    align-items: center;
    text-align: center;
    margin-top: 0;
  }
  span {
    color: ${({ theme }) => theme.colors.red};
  }
}
label {
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 17px;
    line-height: 25px;
  }
}
p {
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 15px;
    line-height: 24px;
  }
}
`;
export const StyledDescriptionRow = styled.div`
display: flex;
text-align: left;
@media (max-width: ${({ theme }) => theme.mobile}) {
  flex-direction: column;
  text-align: center;
}
div{
  min-width: 230px;
  width: 50%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
}
`

export const StyledTeamListHeader = styled.div`
box-sizing: border-box;
background: ${({ theme }) => theme.colors.white};
border: 0.5px solid ${({ theme }) => theme.colors.light_grey};
border-radius: 10px 10px 0px 0px;
color: ${({ theme }) => theme.colors.grey};

display: flex;
flex-direction: row;
justify-content: space-between;

height: 54px;
padding: 14px 32px;
margin-top: 24px;

label{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
  }
}
@media (max-width: ${({ theme }) => theme.mobile}) {
  height: 48px;
  padding: 12px 16px;
  border-radius: 0;
  margin-top: 16px;
  border-radius: 0;
}
`;

export const StyledTeamListContainer = styled.div`
border-radius: 0px 0px 10px 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.light_grey};

table{
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  tbody>tr{
    background: transparent;
    border-top: 0.5px solid ${({ theme }) => theme.colors.light_grey};
    height: 56px;

    img{
      width: 52px;
      height: 38px;
    }
  }
  th {
    text-align: left;
    height: 40px;
  }
  tr th:nth-child(2){
    width: 65%;
  }
  tr th:nth-child(1){
    text-align: center;
  }
  tr td:nth-child(1){
    text-align: center;
  }
  
  .hide{
    display: table-cell;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      display: none;
    }
  }
}
`
export const StyledPhotoInList = styled.div<PhotoPropsType>`
  width: 52px;
  height: 38px;
  margin: 10px 0  8px 0;
  background-image: url("${( props ) => props.url}");
  background-repeat: no-repeat;
  background-size: contain;
`;

