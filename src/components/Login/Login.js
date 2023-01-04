import React, { useState } from 'react'
import './Login.scss'

 function Login() {

    const [email, setEmail] = useState("");
    const [password, setPsw] = useState("");
    const [jwt, setJwt] = useState("");

    function sendLoginRequest(){
        const reqBody = {
            email: email,
            password: password
        };

        console.log(JSON.stringify(reqBody))

        fetch("http://localhost:8080/test/v1/auth/authenticate",{
            headers: {
                "Content-type": "application/json"
            },
            method:"post",
            body: JSON.stringify(reqBody)
        })
        .then((response) =>{
            if(response.status === 200){
                return Promise.all([response.JSON, response.headers]);  
            }
            else{
                return Promise.reject("Invalid login attemp");
            }
        })
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"));
            const item = {
                email,
                password,
                jwt
            };
            alert(item);
        })
        .catch((message)=>{
            alert(message);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendLoginRequest();
        setEmail("");
        setPsw("");
    };

    const reset = () =>{
        console.log('Log out');
    };

    const test = () => {
        console.log('TEST');
    };
    
    return (
    <div className='container'>
        <div className='test'>
        <div className='header'>
                <h1>Welcome to our app!</h1>
                <p>Please login to use the platform!</p>
            </div>
            <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
                <div className='content'>
                    <div className='item'>
                        <label for='email'>Enter email</label>
                        <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='item'>
                        <label for='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={(e) => setPsw(e.target.value)}></input>
                    </div>
                    <div className='item'>
                        <button type='submit'>Log in</button>
                    </div>
                </div>
            </form>
            <button type='button' onClick={() => reset()}>Log out</button>
            <button type='button' onClick={() => test()}>Test</button>
        </div>
    </div>
  )
}

export default Login;
