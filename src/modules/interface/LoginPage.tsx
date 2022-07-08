import LoginForm from "./loginForm"
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import styled from "styled-components";


const StyledLoginImageContainer = styled.div`
  position: absolute;
  margin: 305px 114px;
  width: 605px;
  height: 1024px;
  left: 606px;
  top: 0px;
  background: #f5fbff;
  background-image: url("${(props)=>loginWebPageImg }");
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

const LoginPage = ()=>{
    return (
        <>
        <LoginForm setError={function (msg: string): void {
                throw new Error("Function not implemented.")
            } }/>
        <StyledLoginImageContainer />
        </>
    )
}
export default LoginPage