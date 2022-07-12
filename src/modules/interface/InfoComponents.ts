import styled from "styled-components";


export const StyledContainer = styled.div`
flex:1;

@media (max-width: ${({ theme }) => theme.mobile}) { 
  //margin: 16px 12px 0 12px;
  margin: 16px 0 0 0 ;
}
`;

export const StyledContainerZeroMargin = styled.div`
flex: 1;
margin: 0;

@media (max-width: ${({ theme }) => theme.mobile}) { 
  margin: 0;
}
`;

export const StyledHeaderContainer = styled.div`
box-sizing: border-box;
background: ${({ theme }) => theme.colors.white};
border: 0.5px solid #9c9c9c;
border-radius: 10px 10px 0px 0px;
color: ${({ theme }) => theme.colors.red};

display: flex;
justify-content: space-between;

height: 69px;
padding: 24px;
align-items: center;
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

export const StyledHeaderButtonContainer=styled.div`
display: flex;
gap: 14px;
@media (max-width: ${({ theme }) => theme.mobile}) {
  gap: 10px;
}


&>*{
  flex: 0 0 24px;
}

`


export const StyledMainContainer = styled.div`
background: linear-gradient(276.45deg, #707070 0%, #393939 100.28%);
border-radius: 0px 0px 10px 10px ;
display: flex;
flex-direction: row;
gap:20px;

@media (max-width: ${({ theme }) => theme.mobile}) {
  display: flex;
  flex-direction: column;
  border-radius: 0;
}
`;
type PhotoPropsType = {url? :string}
export const StyledPhotoContainer = styled.div<PhotoPropsType>`
flex: 1 1 400px;
background-image: url("${( props ) => props.url}");
background-repeat: no-repeat;
background-size: contain;
background-position: bottom;

@media (max-width: ${({ theme }) => theme.mobile}) {
  min-width: 150px;  
  min-height: 150px;
  //margin: 0 auto;
  //margin-top: 48px auto;
  background-size: 140px;
  background-position: center;
  flex: 1 1 208px;     
}
`;

export const StyledLogoContainer = styled.div<PhotoPropsType>`
flex: 1 1 250px;

background-image: url("${( props ) => props.url}");
background-repeat: no-repeat;
background-size: contain;
background-size: 210px;
background-position: center;

@media (max-width: ${({ theme }) => theme.mobile}) {
  flex: 1 1 182px;     
  background-size: contain;
  background-size: 90px;
  background-position: center;
}
`;

export const StyledDescriptionContainer = styled.div`
display: flex;
flex: 1 1 400px;
flex-direction: column;
row-gap: 42px;
text-align: left;  
margin-bottom: 60px;

@media (max-width: ${({ theme }) => theme.mobile}) {
  row-gap: 32px;
  text-align: center;
  margin-bottom: 38px;
  flex-basis: content;
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
    margin-top: 4px;
    margin-bottom: 18px;
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
  margin: 8px;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 15px;
    line-height: 24px;
  }
}
`;

export const StyledDescriptionContainerPlayer = styled(StyledDescriptionContainer)`
row-gap: 42px;
margin-bottom: 60px;
@media (max-width: ${({ theme }) => theme.mobile}) {
  row-gap: 24px;  
  margin-bottom: 48px;
}

h2 {  
  margin-top: 65px;
  margin-bottom: 0;

  @media (max-width: ${({ theme }) => theme.mobile}) {    
    margin-top: 4px;
    margin-bottom: 30px;
  }  
}
`;

export const StyledDescriptionRow = styled.div`
display: flex;
text-align: left;
@media (max-width: ${({ theme }) => theme.mobile}) {
  flex-direction: column;
  text-align: center;
  row-gap: 24px;
}
div{
  flex: auto;  
  width: 50%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
}
`

export const StyledDescriptionColumn = styled.div`
display: flex;
flex-direction: column;
text-align: left;
row-gap: 32px;
@media (max-width: ${({ theme }) => theme.mobile}) {
  text-align: center;
  gap: 24px;
}
div{
  flex: auto;
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
  margin-top: 0;
  border-radius: 0;
}
`;

export const StyledTeamListContainer = styled.div`
border-radius: 0px 0px 10px 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.light_grey};
  @media (max-width: ${({ theme }) => theme.mobile}) {
    border-radius: 0;
  }

table{
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  tbody>tr{
    background: transparent;
    border-top: 0.5px solid ${({ theme }) => theme.colors.light_grey};
    height: 55px;

    td{
      padding:0;

      label{
        font-weight: 500;
        font-size: 15px;
        line-height: 24px;
      }
      p{
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        margin: 0;
      }
    }

    img{
      width: 52px;
      height: 38px;
    }
  }
  th {
    text-align: left;
    height: 40px;
    width:80px;
    padding:0;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      height: 36px;
      font-weight: 500;
      font-size: 15px;
      line-height: 24px;
    }
  }
  tr th:nth-child(2){
    width: 65%;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 85%;
    }
  }
  tr th:nth-child(1){
    text-align: center;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 15%;
    }
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

  .playerDescription{
    display: flex;
    flex-direction: column;
    align-self: center;
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

