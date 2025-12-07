import { useState } from "react"

import { loginUser, signupUser } from '../store/actions/user.actions.js'

export function LoginPage(){

    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    function switchLoginSignup(){
        setIsLogin((isLogin) => !isLogin)
        setErrorMsg('')
    }

    async function handleLogin(){
        setErrorMsg('')
        try{
            await loginUser({ username, password })
        } catch(err){
            setErrorMsg('Login failed, please check your credentials.')
        }
    }

    async function handleSignUp(){
        setErrorMsg('')
        try{
            await signupUser({ username, password, fullname })
        } catch(err){
            setErrorMsg('Signup failed, please try again.')
        }
    }

    return (
        <section className="login-page">
            <div className="login-page-content">
                <div className="login-page-logo"></div>
                {isLogin ? 
                    <>
                        <h1 className="login-page-title">Welcome Back</h1>
                        <div className="login-page-form login-page-form-login">
                            <p>Username</p>
                            <input type="text" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                            <p>Password</p>
                            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                            <button onClick={handleLogin} className="login-button">Log In</button>
                        </div>
                        {errorMsg && <p className="login-error-msg">{errorMsg}</p>}
                        <p className="change-functionality-text" >Don't have an account?</p>
                        <button className="change-functionality-button" onClick={switchLoginSignup}>Sign Up</button>
                    </>
                :
                    <>
                        <h1 className="login-page-title">Sign up to start listening</h1>
                        <div className="login-page-form login-page-form-login">
                            <p>Username</p>
                            <input type="text" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                            <p>Password</p>
                            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                            <p>Name</p>
                            <input type="text" value={fullname} onChange={(ev) => setFullname(ev.target.value)} />
                            <button onClick={handleSignUp} className="login-button">Sign Up</button>
                        </div>
                        {errorMsg && <p className="login-error-msg">{errorMsg}</p>}
                        <p className="change-functionality-text">Already have an account?</p>
                        <button className="change-functionality-button" onClick={switchLoginSignup} >Log in</button>
                    </>
                }
                
            </div>
        </section>
    )

}
