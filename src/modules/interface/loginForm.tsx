import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "common/components/Button/Button.styled";
import Input from "common/components/Input/Input";
import styled from "styled-components";
import PasswordInput from "common/components/PasswordInput";
import { AppStateType } from "core/redux/configureStore";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { errorActions } from "core/redux/errorSlice";
import { login } from "core/redux/userSlice";
import { LoginFormDto } from "api/Dto/userDto";

const StyledLoginContainer = styled.div`
  margin: 340px 120px 0 120px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 115px 24px 0 24px;
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
      height: 18px;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.grey};
      margin: 0 0 8px 0;

      @media (max-width: ${({ theme }) => theme.mobile}) {
        font-size: 17px;
        line-height: 25px;
      }
    }
    button {
      height: 40px;
    }
  }

  button {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  nav {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    position: relative;
    color: ${({ theme }) => theme.colors.grey};

    a {
      color: ${({ theme }) => theme.colors.lightest_red};
    }
  }
`;

/**type UserLoginForm = {
  login: string;
  password: string;
};*/
type PropsType = {
  setError?: (msg: string) => void;
};
type StateType = {
  login: string;
  password: string;
  msg: string;
};
const LoginForm: React.FC<PropsType> = (props) => {
  const globalSetError = props.setError;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<LoginFormDto>();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: AppStateType) => state.user.currentUser
  );
  const isLoggedIn = useAppSelector(
    (state: AppStateType) => state.user.isLoggedIn
  );
  const error = useAppSelector((state: AppStateType) => state.user.error);
  const navigate = useNavigate();

  useEffect(() => {
    //if(currentUser && currentUser.token) navigate("/teams")
  }, [currentUser]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(errorActions.clearErrorMessage());
      navigate("/teams");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) {
      dispatch(errorActions.setErrorMessage(error));
      setError("password", {
        type: "custom",
        message: "Wrong password. Please, try again.",
      });
    }
  }, [error]);

  const onSubmit = (data: LoginFormDto) => {
    dispatch(login(data));
  };

  return (
    <StyledLoginContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Sign In</h4>
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
            })}
            error={errors.password?.message}
          />
        </div>

        <div>
          <StyledButton type="submit">Sign In</StyledButton>
        </div>
      </form>

      <nav>
        <span>Not a member yet? </span>
        <a href="/register">Sing up</a>
      </nav>
    </StyledLoginContainer>
  );
};

export default LoginForm;
