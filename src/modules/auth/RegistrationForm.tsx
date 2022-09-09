import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "common/components/Input/Input";
import { StyledButton } from "common/components/Button/Button.styled";
import { Checkbox } from "common/components/Checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "common/components/PasswordInput";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { register as userRegister, userActions } from "core/redux/userSlice";
import { RegisterFormDto } from "api/Dto/userDto";
import { AppStateType } from "core/redux/configureStore";
import { StyledFormContainer } from "./AuthComponents";
import { useAPIError } from "common/hooks/useApiError";
import { simplePasswordPatern } from "regexpList";

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

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<UserSubmitForm>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const error = useAppSelector((store: AppStateType) => store.user.error);
  const { addError, removeError } = useAPIError();
  const user = useAppSelector((store: AppStateType) => store.user.currentUser);

  useEffect(() => {
    if (user) {
      removeError();
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      addError(error);
      clearUserError();
    }
  }, [error]);

  const onSubmit = (data: UserSubmitForm) => {
    dispatch(userRegister(data));
  };
  const clearUserError = () => {
    dispatch(userActions.removeError());
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
          <NavLink to="/" onClick={clearUserError}>
            Sing in
          </NavLink>
        </nav>
      </form>
    </StyledFormContainer>
  );
};
