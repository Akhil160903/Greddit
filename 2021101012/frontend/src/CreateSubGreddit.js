import  { useEffect } from 'react';
// import { Navigate } from 'react-router';
import Navbar from './Navbar';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateSubGreddit(props) {
    useEffect(() => {
    }, [])
    const navigate = useNavigate();

    const [SubGreddit,setSubGreddit]=useState({
        name:"",
        nopisg:"",
        noppisgun:"",
        description:"",
        banned_keywords:"",
        tags:"",
        //add tags
    });

    let name;
    let value;
    const change=(e)=>
    {
        name=e.target.name;
        value=e.target.value;
        setSubGreddit({...SubGreddit,[name]:value})
    } 
    const str = window.localStorage.getItem("localstr");

    const postdata = (event) =>
    {
        event.preventDefault();
        // console.log(SubGreddit)
        axios.post("http://localhost:4000/api/createsubgreddit",{store : str , val : SubGreddit})
        .then((res) => {
            // console.log(res.data)
            if(res.data.message === 1)
            {
                // props.onFormSwitch('MySubGreddit');
                navigate("/MySubGreddit");
            }else{
                alert("fault");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    return (
        <div>
            <Navbar />
            <h1 style={{ color: "white" }}>This is MySubGreddit Creation Page</h1>

            {/* <div>
                <button OnClick={Navigate("/CreateSubGreddit")}>Create a new SubGreddit</button>
            </div> */}
            <div className="nav--title">
                {/* <Navbar/> */}
                {/* <h1>Registration krle lawde</h1> */}
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-md-4 p-5 shadow-sm border rounded-3">
                        <h2 className="text-center mb-4 text-primary">SubGreddit Creation Form</h2>
                        <form>
                            {/* <div className="mb-3">
                                <label for="exampleInputFirstName" className="form-label">First Name</label>
                                <input value={User.firstname} onChange={change} name="firstname" type="text" className="form-control border border-primary" id="exampleInputFirstName" aria-describedby="emailHelp" />
                            </div> */}
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                <input value={SubGreddit.name} onChange={change} name="name" type="text" className="form-control border border-primary"  />
                            </div>
                            {/* <div className="mb-3">
                                <label for="exampleInputLastName" className="form-label">Number of people in the Sub Greddiit</label>
                                <input value={SubGreddit.nopisg} onChange={change} name="nopisg" className="form-control border border-primary"  />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputUserName" className="form-label">Number of posts posted in the Sub Greddiit until now</label>
                                <input value={SubGreddit.noppisgun} onChange={change} name="noppisgun" className="form-control border border-primary"  />
                            </div> */}
                            <div className="mb-3">
                                <label for="exampleInputAge" className="form-label">Description</label>
                                <input value={SubGreddit.description} onChange={change} name="description" className="form-control border border-primary" id="exampleInputAge"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputContactNo" className="form-label">Comma-separated list of banned keywords</label>
                                <input value={SubGreddit.banned_keywords} onChange={change} name="banned_keywords" className="form-control border border-primary" id="exampleInputContactNo"  />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Tags</label>
                                <input value={SubGreddit.tags} onChange={change} name="tags" className="form-control border border-primary"   />
                            </div>
                            {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
                            <div className="d-grid">
                                <button className="btn btn-primary" type="submit" 
                                onClick={postdata}
                                >
                                    Create SubGreddit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateSubGreddit;