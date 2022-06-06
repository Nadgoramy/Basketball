import React from "react";
import { useForm } from "react-hook-form";
import AuthService from "../../api/authService";

type UserSubmitForm = {    
    userName: string;
    login: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  };

const RegistrationForm: React.FC =()=> {
  //const { register, handleSubmit } = useForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<UserSubmitForm>();


  const onSubmit = ( data: UserSubmitForm) => {console.log(data);
    AuthService.register(data.userName, data.login, data.password)
    .catch((err) => console.log(err)); 
}
   
  return (
     <div className="register-form">
    <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Sing Up</h4>
        <div>
            <label>
                User name:
                <input {...register("userName", { required: true, maxLength: 30 })} 
                    className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.userName?.message}</div>
            </label>
        </div>
        <div>
            <label>
                Login:
                <input {...register("login", { required: true, maxLength: 30 })} 
                className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.login?.message}</div>
            </label>
        </div>
        <div>
            <label>
                Password:
                <input type="password" {...register("password", { required: true, maxLength: 30 ,
                    pattern: {
                        value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/,
                        message:""
                    }
                })} />                
            </label>
        </div>
        <div>
            <label>
                Enter your password again: 
                <input type="password" {...register("confirmPassword", { required: true, maxLength: 30 , 
                    validate: value => value === getValues("password")                    
                    })} />                
            </label>
        </div>
        <div>
            <input type="checkbox" value="false" {...register("acceptTerms", { required: true, maxLength: 30 })} />
        </div>
        <div>
            <input type="submit" value="Sing Up" />
        </div> 
        <div>
            <p>Already a member?</p><a ></a>
        </div>    
    </form>
    </div> 
  );
}

export default RegistrationForm;