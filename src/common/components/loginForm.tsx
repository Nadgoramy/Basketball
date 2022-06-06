import React, {Component} from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import AuthService from '../../api/authService';
import { AuthUserDto } from '../../api/AuthUserDto';
import RegistrationForm from './RegistrationForm';
import './loginForm.css'

type PropsType = {
  user : AuthUserDto
      dispatch : (action: any) => any;
}
type StateType = {
    login: string;
    password: string;
    msg: string;
  };
  class LoginForm extends React.Component<PropsType, StateType> {
    state = {
        login: "",
        password: "",
        msg: ""
    };
    
    onLoginChange = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ login: e.currentTarget.value });
    };

    onPasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ password: e.currentTarget.value });
      };

    onSubmit=(e: React.SyntheticEvent) => {
        e.preventDefault();        
        AuthService.login(this.state.login, this.state.password)
        .then(user=>{ this.props.dispatch({ type: 'SET_USER', name : user.name,avatarUrl: user.avatarUrl, token:user.token }) })
        .catch(err => this.setState({msg: err.toString()}));        
      }

    render() {
      return (
        <div className='loginFormContainer'>
        <form onSubmit={this.onSubmit}>
          <label className='formName'>Sing in</label>
            <div>
                <p className='labelFont'>
                    Login:                    
                </p>
                <input type="text" 
                  name="login" 
                  value={this.state.login} 
                  onChange={this.onLoginChange} 
                  className='loginFormInput'/>
            </div>
            <div>
                <p className='labelFont'>
                    Password:                    
                </p>
                <input type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.onPasswordChange} 
                    className='loginFormInput'/>
            </div>
            {this.state.msg &&
            <div>
                <label>
                    Error:
                    <p>{this.state.msg}</p>
                </label>            
            </div>
            }
            <div>
                <input type="submit" value="Log in" className='submitButton'/>
            </div>
        </form>
        <a href='/register'>Register</a>      
        
        </div>
      );
    }
  }

function mapStateToProps(state:any , ownProps: any){
    return{
      user : state.user,
      dispatch : state.dispatch
    }
}
const mapDispatch = {
  setUser: (name:string, avatar: string, token: string) => ({ type: 'SET_USER', name: name, avatarUrl: avatar, token:token }),
}

  export default connect(mapStateToProps)(LoginForm);