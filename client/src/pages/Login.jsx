import {Link} from "react-router-dom";
import {useState} from "react";
import Cookies from "js-cookie";

export default function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [feedBack,setFeedback] = useState("")

    async function submit(e){
        e.preventDefault()
        const res = await fetch('/api/user/login',{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"Application/JSON"
            }
        })

        if(!res.ok){
            const error = await res.json()
            console.error(error)
            setFeedback(error.msg)
            return;
        }

        setFeedback("")
        const token = await res.text()
        Cookies.set('token',token)
        location.reload()
    }

    return <>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={submit} id="login-form" action="#">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            type="email"
            className="input-field" // Apply same style as home page input
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            type="password"
            className="input-field" // Apply same style as home page input
          />
        </div>
        <button className="create-button mr">Login</button>

        <Link to="/signup" className="link">
          Don't have an acoount? Sign up!
        </Link>
        {!!feedBack && <p className="feedback">{feedBack}</p>}
      </form>
    </div>
    </>
}