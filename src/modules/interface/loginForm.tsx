import React, {Component} from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import AuthService from 'api/authService';
import { AuthUserDto } from 'api/AuthUserDto';
import {StyledButton} from 'common/components/Button/Button.styled';
import Input from 'common/components/Input/Input';
import styled from 'styled-components';

const StyledLoginContainer = styled.div`
margin: 226px 120px 0 120px;
display: flex;
flex-direction: column;

h4{  
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
div{
  margin-bottom: 24px;

  p{
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #707070;
    margin: 0 0 8px 0;
  }
  button{
    height:40px;
  }
}

nav{
  text-align: center;
  position: relative;
  top: 60px;
  color:#707070;

  a{
    color: #FF768E;
  }
}
`


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
        .then(user=>{ 
          this.props.dispatch({ type: 'SET_USER', name : user.name, avatarUrl: user.avatarUrl, token:user.token })                     
        })
        .catch(err => this.setState({msg: err.toString()}));        
      }

    render() {
      return (
        <StyledLoginContainer>
        <form onSubmit={this.onSubmit}>
          <h4 >Sing in</h4>
            <div>
                <p >
                    Login:                    
                </p>
                <Input type="text" 
                  name="login" 
                  value={this.state.login} 
                  onChange={this.onLoginChange} 
                  />
            </div>
            <div>
                <p>
                    Password:                    
                </p>
                <Input
                  type="password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onPasswordChange} 
                  error={this.state.msg}/>
                
            </div>            
            <div>
                <StyledButton type='submit'>Sing in</StyledButton>
            </div>
        </form>
        <nav>
          <span>Not a member yet?</span>
        <a href='/register'>Sing up</a>      
        </nav>
        
        </StyledLoginContainer>
      );
    }
  }

function mapStateToProps(state:any , ownProps: any){
    return{
      user : state.user,
      dispatch : state.dispatch
    }
}

  export default connect(mapStateToProps)(LoginForm);


  /*
  <input type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.onPasswordChange} 
                    className='loginFormInput'/>
  */