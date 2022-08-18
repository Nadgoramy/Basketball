import RegistrationForm from "./RegistrationForm";
import registerPageImg from "asserts/images/registerWebPage.svg";
import { StyledImageContainer } from "./AuthComponents";

const RegistrationPage = () => {
  return (
    <>
      <RegistrationForm />
      <StyledImageContainer url={registerPageImg}/>
    </>
  );
};
export default RegistrationPage;
