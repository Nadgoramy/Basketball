import styled from "styled-components";
import RegistrationForm from "./RegistrationForm"
import registerPageImg from "asserts/images/registerWebPage.svg"

const StyledRegisterImageContainer = styled.div`
  position: absolute;
  margin: 305px 87px;
  width: 660px;
  height: 1024px;
  left: 606px;
  top: 0px;
  background: #f5fbff;
  background-image: url("${(props) => registerPageImg }");
  background-repeat: no-repeat;
  background-size: contain;
  

  @media (max-width: ${({ theme }) => theme.mobile}) {
    dispplay: none;
    position: relative;
    width: 100%px;
    width: 1px;
    height: 1px;
    left: 0px;
    top: 0px;
  }
  img {
    margin: 306px 114px;
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