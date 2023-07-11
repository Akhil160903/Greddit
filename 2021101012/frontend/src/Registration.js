import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import Login from "./Login";
// import Navbar from './Navbar';
function Registration(props)
{
    const navigate = useNavigate();
    // const[firstname,setFirstName]=useState('');
    // const[lastname,setLastName]=useState('');
    // const[username,setUserName]=useState('');
    // const[Email,setEmail]=useState('');
    // const[Age,setAge]=useState('');
    // const[Contact,setContact]=useState('');
    // const [Password,setPassword]=useState('');
    // const [signin,setsignin] = useState(false);
    const [User,setUser]=useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        age:"",
        contact:"",
        pass:""
    });

    let name;
    let value;
    const change=(e)=>
    {
        name=e.target.name;
        value=e.target.value;
        setUser({...User,[name]:value})
    } 

    const postdata = (event) =>
    {
        event.preventDefault();
        axios.post("http://localhost:4000/api/register",User)
        .then((res) => {
            if(res.data.message === 1)
            {
                props.onFormSwitch('Login');
                // navigate("/");
            }else{
                alert("fault");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    return(
        // signin === false ?
        <div className="nav--title">
            {/* <Navbar/> */}
            {/* <h1>Registration krle lawde</h1> */}
            <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4 p-5 shadow-sm border rounded-3">
                <h2 className="text-center mb-4 text-primary">Registration Form</h2>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputFirstName" className="form-label" style={{color:"white"}}>First Name</label>
                        <input value={User.firstname} onChange={change} name="firstname" type="text" className="form-control border border-primary" id="exampleInputFirstName" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputLastName" className="form-label" style={{color:"white"}}>Last Name</label>
                        <input value={User.lastname} onChange={change} name="lastname" type="text" className="form-control border border-primary" id="exampleInputLastName" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputUserName" className="form-label" style={{color:"white"}}>Username</label>
                        <input value={User.username} onChange={change} name="username" type="text" className="form-control border border-primary" id="exampleInputUserName" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label" style={{color:"white"}}>Email address</label>
                        <input value={User.email} onChange={change} name="email" type="email" className="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputAge" className="form-label" style={{color:"white"}}>Age</label>
                        <input value={User.age} onChange={change} name="age" type="number" min="2" className="form-control border border-primary" id="exampleInputAge" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputContactNo" className="form-label" style={{color:"white"}}>Contact Number</label>
                        <input value={User.contact} onChange={change} name="contact" type="number" min={1e9} max={1e10 -1} className="form-control border border-primary" id="exampleInputContactNo" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label" style={{color:"white"}}>Password</label>
                        <input value={User.pass} onChange={change} name="pass" type="password" className="form-control border border-primary" id="exampleInputPassword1"/>
                    </div>
                    {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit" onClick={postdata}>Register</button>
                    </div>
                </form>
                <div className="mt-3">
                    <p className="mb-0  text-center" style={{color:"white"}}>If already registered then <a onClick={() => props.onFormSwitch('Login')}
                            className="text-primary fw-bold">Log
                            in</a></p>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Registration;