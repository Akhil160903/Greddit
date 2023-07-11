import React , {useState} from "react";
import { useEffect } from "react";
// import Navbar from './Navbar';
// import {Profile} from "./Profile";
// import Registration from "./Registration";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Login(props)
{
    const navigate = useNavigate();
    useEffect(() => {
    if(window.localStorage.getItem("localstr") != null)
    {
        navigate("/Profile");
    }});
    const [User,setUser]=useState({
        username:"",pass:""
    });
    // const [Password,setPassword]=useState('');
    // const[signin,setsignin] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/login",User)
        .then((res)=>{
            if(res.data.messages === 1)
            {
                var storage = res.data.tok;
                window.localStorage.setItem("localstr",storage);
                navigate("/Profile"); 
            }
            else if(res.data.messages === 12)
            {
                alert("Please register first!");
            }
            else{
                alert("Please check your password");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    let name;
    let value;
    const change=(e)=>
    {
        name=e.target.name;
        value=e.target.value;
        setUser({...User,[name]:value})
    }
    return(
        // signin === true ? 
        <div className="nav--title">
            {/* <Navbar/> */}
            <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4 p-5 shadow-sm border rounded-3">
                <h2 className="text-center mb-4 text-primary">Login Form</h2>
                <form onSubmit={handleSubmit} action="/">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label" style={{color:"white"}}>Username</label>
                        <input value={User.username} onChange={change} name="username" type="text" className="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label" style={{color:"white"}}>Password</label>
                        <input value={User.pass} onChange={change} name="pass" type="password" className="form-control border border-primary" id="exampleInputPassword1"/>
                    </div>
                    {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit} style={{color:"white"}} >Login</button>
                    </div>
                </form>
                <div className="mt-3">
                    <p className="mb-0  text-center" style={{color:"white"}}>Don't have an account? <a onClick={()=> props.onFormSwitch('Registration')} className="text-primary fw-bold">Sign Up</a></p>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Login;