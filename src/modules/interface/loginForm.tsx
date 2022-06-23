import React, { Component } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "api/authService";
import { StyledButton } from "common/components/Button/Button.styled";
import Input from "common/components/Input/Input";
import styled from "styled-components";
import PasswordInput from "common/components/PasswordInput";
import { useDispatch } from "react-redux";

const StyledLoginContainer = styled.div`
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

type UserLoginForm = {
  login: string;
  password: string;
};
type PropsType = {
  setError: (msg: string) => void;
};
type StateType = {
  login: string;
  password: string;
  msg: string;
};
const LoginForm: React.FC<PropsType> = (posts) => {
  const globalSetError = posts.setError
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm<UserLoginForm>();
  const dispatch = useDispatch();

  const onSubmit = (data: UserLoginForm) => {
    console.log(data);
    AuthService.login(data.login, data.password)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "SET_USER",
          name: user.name,
          avatarUrl: user.avatarUrl,
          token: user.token,
        });
      })
      .catch((err) => {
        if (err.status == 401) globalSetError("User with the specified username / password was not found.");
        else globalSetError(err.message);
        setError("password", { type: "custom" , message: "Wrong password. Please, try again."})
        setTimeout(() => {
          globalSetError("");
        }, 15000);
      });
  };

  return (
    <StyledLoginContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Sing Up</h4>
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
          <StyledButton type="submit">Sing Up</StyledButton>
        </div>
      </form>

      <nav>
        <span>Not a member yet?</span>
        <a href="/register">Sing up</a>
      </nav>
    </StyledLoginContainer>
  );
};

export default LoginForm;
