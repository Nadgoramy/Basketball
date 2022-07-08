import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthService from "api/authService";
import Input from "common/components/Input/Input";
import { StyledButton } from "common/components/Button/Button.styled";
import Checkbox from "common/components/Checkbox";
import { useLocation } from "react-router-dom";
import PasswordInput from "common/components/PasswordInput";
import { useAppDispatch } from "core/redux/store";
import { errorActions } from "core/redux/errorSlice";

const StyledFormContainer = styled.div`
  margin: 226px 120px 0 120px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 226px 24px 0 24px;
  }

  h4 {
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 49px;
    color: #344472;
    padding-bottom: 32px;
    margin: 0 0;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      text-align: center;
    }
  }
  div {
    margin-bottom: 24px;

    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.grey};
      margin: 0 0 8px 0;
    }
    button {
      height: 40px;
    }
  }

  nav {
    text-align: center;
    position: relative;
    color: ${({ theme }) => theme.colors.grey};

    a {
      color: ${({ theme }) => theme.colors.lightest_red};
    }
  }
`;

type UserSubmitForm = {
  userName: string;
  login: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};
const initialValue: UserSubmitForm = {
  userName: "",
  login: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};
interface RegProps {
  setError?: (msg: string) => void;
}
const RegistrationForm: React.FC<RegProps> = ({ setError }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<UserSubmitForm>();

  const location = useLocation();
  const passwordPatern = RegExp(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/
  );
  const simplePasswordPatern = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  const dispatch = useAppDispatch();

  const onSubmit = (data: UserSubmitForm) => {
    console.log(data);
    AuthService.register(data.userName, data.login, data.password)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("user", JSON.stringify(response));
          dispatch({
            type: "SET_USER",
            name: response.name,
            avatarUrl: response.avatarUrl,
            token: response.token,
          });
          location.pathname = "/";
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.status == 409) {
          dispatch(errorActions.setErrorMessage("User with such login already exists"))
          //setError("User with such login already exists");
        }
        else {
          dispatch(errorActions.setErrorMessage(err.message))
          //setError(err);
        }       
      });
  };

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Sing Up</h4>
        <div>
          <p>User name:</p>
          <Input
            {...register("userName", {
              required: "User name is required",
              maxLength: 30,
            })}
            className={`form-control ${errors.userName ? "is-invalid" : ""}`}
            error={errors.userName?.message}
          />
        </div>
        <div>
          <p>Login:</p>
          <Input
            {...register("login", {
              required: "Login is required",
              maxLength: 30,
            })}
            className={`form-control ${errors.login ? "is-invalid" : ""}`}
            error={errors.login?.message}
          />
        </div>
        <div>
          <p>Password:</p>
          <PasswordInput
            {...register("password", {
              required: "Pasword is required",
              maxLength: {
                value: 30,
                message: "Password should be less then 30 simbols",
              },
              pattern: {
                value: simplePasswordPatern,
                message: "Password can contain letters numbers",
              },
            })}
            error={errors.password?.message}
          />
        </div>
        <div>
          <p>Enter your password again:</p>
          <PasswordInput
            {...register("confirmPassword", {
              required: "Confirm pasword is required",
              maxLength: {
                value: 30,
                message: "Password should be less then 30 simbols",
              },
              validate: {
                positive: (value) =>
                  value === getValues("password") ||
                  "Should be equal to password",
              },
            })}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div>
          <Checkbox
            label="Accept Terms"
            {...register("acceptTerms", {
              validate: {
                positive: (value) => value || "Do you agree with terms?",
              },
            })}
            error={errors.acceptTerms?.message}
          />
        </div>
        <div>
          <StyledButton type="submit">Sing Up</StyledButton>
        </div>
      </form>
      <nav>
        <span>Already a member? </span>
        <a href="/">Sing ip</a>
      </nav>
    </StyledFormContainer>
  );
};

export default RegistrationForm;
