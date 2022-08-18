import LoginForm from "./loginForm";
import loginPageImg from "asserts/images/loginWebPage.svg";
import { StyledImageContainer } from "./AuthComponents";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <StyledImageContainer url={loginPageImg} />
    </>
  );
};
export default LoginPage;
