import LoginForm from "./loginForm"
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import styled from "styled-components";


const StyledLoginImageContainer = styled.div`
  position: relative;
  margin: auto;  
  flex: 1 1 834px;
  height: 412px;
  
  background: #f5fbff;
  background-image: url("${(props)=>loginWebPageImg }");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
    position: relative;
    width: 1px;
    height: 1px;
    left: 0px;
    top: 0px;
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