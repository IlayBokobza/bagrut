import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Cookies from 'js-cookie'

export default function Signup(){
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [feedBack,setFeedback] = useState("")
    const navigate = useNavigate()

    async function submit(e){
        e.preventDefault()
        const res = await fetch('/api/user/signup',{
            method:"POST",
            body:JSON.stringify({email,password,name}),
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
        navigate('/')
    }

    return <>
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={submit} action="#" id="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            type="email"
            className="input-field" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
            type="name"
            className="input-field" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            type="password"
            className="input-field" 
          />
        </div>
        <button className="create-button mr">Sign up</button>

        <Link to="/login" className="link">
          Already have an account? Login!
        </Link>
        {!!feedBack && <p className="feedback">{feedBack}</p>}
      </form>
    </div>
    </>
}