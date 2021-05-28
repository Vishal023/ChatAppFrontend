import React from 'react';
import '../scss/Login.scss';
import {Button} from "@material-ui/core";
import {Mail} from "@material-ui/icons";
import LoginLogo from '../assets/img/login.svg';

const Login = () => {
    const handleLogin = () => {
        window.open("http://localhost:8080/auth/google", "_self");
    }

    return (
        <div className={"Login flex flex-jc-c flex-ai-c"}>
            <div className="Login-card">
                <div className={"Login-img flex flex-jc-c "}>
                    <img src={LoginLogo} alt=""/>
                </div>
                <div className={"Login-button flex flex-col"}>
                    <h3>
                        To Start Chatting Login
                    </h3>
                    <Button variant={"outlined"} onClick={handleLogin} endIcon={<Mail/>}>
                        LOGIN WITH GOOGLE
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;