import styled from "styled-components";

const ErrorPopUpStyled = styled.div`
position: absolute;
right: 0;
top: 0;

background: ${({theme})=> theme.colors.light_red};
border-radius: 4px;
margin: 36px;

p{
    color: ${({theme})=> theme.colors.white};
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}
`
interface PropType{
    errorMessage: string
}
const ErrorPopUp = (props: PropType)=>{
return(
    <ErrorPopUpStyled>
        <p>{props.errorMessage}</p>
    </ErrorPopUpStyled>
)}

export default ErrorPopUp;