import styled from "styled-components";

const ErrorPopUpStyled = styled.div`
position: absolute;
display: flex;
right: 0;
top: 0;
height: 40px;
z-index:1000;

background: ${({theme})=> theme.colors.light_red};
border-radius: 4px;
margin: 36px;

span{
    color: ${({theme})=> theme.colors.white};
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin: auto 16px;
}
`
interface PropType{
    errorMessage: string
}
const ErrorPopUp = (props: PropType)=>{
return(
    <ErrorPopUpStyled>
        <span>{props.errorMessage}</span>
    </ErrorPopUpStyled>
)}

export default ErrorPopUp;