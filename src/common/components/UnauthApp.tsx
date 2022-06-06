import React from 'react';
import LoginForm from '../../common/components/loginForm';
import loginWebPageImg from '../../asserts/images/loginWebPage.svg';
import './UnauthApp.css';


class UnauthApp extends React.Component{
    render(){
        return (            
            <div className="loginPage">
                <div className='loginContainer'>
                <LoginForm/>              
                </div>
                <div className='imageContainer'>   
                    <img src={loginWebPageImg}></img>                 
                </div>
            </div>      
        );
    }
}

export default UnauthApp;