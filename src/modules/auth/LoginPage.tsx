import { LoginForm } from "./loginForm";
import loginPageImg from "asserts/images/loginWebPage.svg";
import { StyledImageContainer } from "./AuthComponents";

export const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <StyledImageContainer url={loginPageImg} />
    </>
  );
};
