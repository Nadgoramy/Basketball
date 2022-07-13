import styled from "styled-components";
import RegistrationForm from "./RegistrationForm"
import registerPageImg from "asserts/images/registerWebPage.svg"

const StyledRegisterImageContainer = styled.div`  
  flex: 1 1 834px;
  height: 414px;
  margin: auto;  

  background: #f5fbff;
  background-image: url("${(props) => registerPageImg }");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    dispplay: none;
    position: relative;
    width: 100%px;
    width: 1px;
    height: 1px;
    left: 0px;
    top: 0px;
  }
  
`;

const RegistrationPage = ()=>{
    return (
        <>
        <RegistrationForm/>
        <StyledRegisterImageContainer />
        </>
    )
}
export default RegistrationPage