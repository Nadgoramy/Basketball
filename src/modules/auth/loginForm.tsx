import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { StyledButton } from "common/components/Button/Button.styled";
import Input from "common/components/Input/Input";
import PasswordInput from "common/components/PasswordInput";
import { AppStateType } from "core/redux/configureStore";
import { store, useAppDispatch, useAppSelector } from "core/redux/store";
import { errorActions } from "core/redux/errorSlice";
import { login, userActions } from "core/redux/userSlice";
import { LoginFormDto } from "api/Dto/userDto";
import { StyledFormContainer } from "./AuthComponents";

type PropsType = {
  setError?: (msg: string) => void;
};
const LoginForm: React.FC<PropsType> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormDto>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (state: AppStateType) => state.user.isLoggedIn
  );
  const error = useAppSelector((state: AppStateType) => state.user.error);
  const postTime = useAppSelector(
    (store: AppStateType) => store.user.postAttemptTime
  );
  const navigate = useNavigate();

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
  }, [error, postTime]);

  const onSubmit = (data: LoginFormDto) => {
    dispatch(login(data) as any);
  };

  const removeError = () => {
    dispatch(userActions.removeError());
  };
  return (
    <StyledFormContainer>
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
        <nav>
          <span>Not a member yet? </span>
          <NavLink to="/register" onClick={removeError}>
            Sing up
          </NavLink>
        </nav>
      </form>
    </StyledFormContainer>
  );
};

export default LoginForm;
