import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ApiResponse{
    user:any;
    auth:string;
}
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("users");
        if (auth) {
            navigate('/');
        }
    })

    const logindata = async () => {
        console.log({ email, password });

        let result = await fetch('http://localhost:4000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let result1:ApiResponse = await result.json();
        console.log(result)
        if (result1.auth) {
            localStorage.setItem('users', JSON.stringify(result1.user));
            localStorage.setItem('token',JSON.stringify(result1.auth));
            navigate('/');
        } else {
            alert("Please enter correct details");
        }

    }

    return (
        <div className="login">
            <h1>Login</h1>
            < input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            < input className="inputBox" type="password" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signUpbtn" onClick={logindata}>Login</button>
        </div>

    )
}

export default Login;