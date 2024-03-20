import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface ApiResponse{
  result:any;
  auth:string;
}
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate('/');
    }
  })

  const data = async () => {
    console.log(name, email, password);

    let result = await fetch('http://localhost:4000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let result1:ApiResponse = await result.json();
    console.log(result);
    localStorage.setItem("users", JSON.stringify(result1.result));
    localStorage.setItem("token",JSON.stringify(result1.auth));
    if (result) {
      navigate('/');
    }

  }

  return (
    <div className="signUp">
      <h1>Register</h1>
      <input className="inputBox" type="text" placeholder="Enter Name"
        value={name} onChange={(e) => setName(e.target.value)}
      />
      <input className="inputBox" type="text" placeholder="Enter Email"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <input className="inputBox" type="password" placeholder="Enter Password"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={data} className="signUpbtn" type="button">Sign up</button>
    </div>
  )
}


export default Signup;