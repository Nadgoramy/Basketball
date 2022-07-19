import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "common/components/Input/Input";
import { StyledButton } from "common/components/Button/Button.styled";
import Checkbox from "common/components/Checkbox";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "common/components/PasswordInput";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { errorActions } from "core/redux/errorSlice";
import { register as userRegister } from "core/redux/userSlice";
import { RegisterFormDto } from "api/dto/userDto";
import { AppStateType } from "core/redux/configureStore";

const StyledFormContainer = styled.div`
  display: flex;
  margin: auto;
  flex: 1 1 606px;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0 24px 0 24px;
    display: flex;
    align-items: center;
    justify-content: center;
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

  form {
    width: 365px;
    margin: auto 24px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      margin: auto;
    }
  }

  div {
    margin-bottom: 18px;

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

interface UserSubmitForm extends RegisterFormDto {
  confirmPassword: string;
  acceptTerms: boolean;
}
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
    setValue,
  } = useForm<UserSubmitForm>();

  const navigate = useNavigate();
  const passwordPatern = RegExp(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/
  );
  const simplePasswordPatern = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  const dispatch = useAppDispatch();
  const error = useAppSelector((store: AppStateType) => store.user.error);
  const isLoggedIn = useAppSelector(
    (store: AppStateType) => store.user.isLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) {
      dispatch(errorActions.setErrorMessage(error));
    }
  }, [error]);

  const onSubmit = (data: UserSubmitForm) => {    
    dispatch(userRegister(data));
  };

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Sign Up</h4>
        <div>
          <p>Name:</p>
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
            {...register("acceptTerms", {
              required: "Do you agree with terms?",
            })}
            label="I accept the agreement"
            initialValue={getValues("acceptTerms")}
            onChange={(e) => {
              e.preventDefault();
              setValue("acceptTerms", !e.target.checked, {
                shouldValidate: true,
              });              
            }}
            error={errors.acceptTerms?.message}
          />
        </div>
        <div>
          <StyledButton type="submit">Sing Up</StyledButton>
        </div>
        <nav>
          <span>Already a member? </span>
          <NavLink to="/">Sing in</NavLink>
          
        </nav>
      </form>
    </StyledFormContainer>
  );
};

export default RegistrationForm;