// import React, { useEffect } from 'react';
// // import { Navigate } from 'react-router';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// function MySubGreddit() {
//     const navigate = useNavigate();
//     useEffect(()=>{
//     } ,[])
//     return (
//         <div>
//             <Navbar />
//             <h1 style={{color:"white"}}>This is MySubGreddit</h1>
//             <div>
//                 <button onClick={() => { navigate("/CreateSubGreddit")}}>Create a new SubGreddit</button>
//             </div>
//         </div>
//     )
// }
// export default MySubGreddit;
import React from "react";
import Navbar from "./Navbar.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MySubGreddit()  {

  const navigate = useNavigate();
  var [curruser, setcurruser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    contact: "",
    pass: "",
    About: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getdata", { store: str })
      .then((res) => {
        var getdata = res.data.message;
        setcurruser(getdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var [subgredditdata, setsubgredditdata] = useState([]);

  const str = window.localStorage.getItem("localstr");
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getsubgredditdata", { store: str })
      .then((res) => {
        var gredditdata = res.data.message;
        setsubgredditdata(gredditdata);
        // console.log(subgredditdata[0].name)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const DeleteSubgreddit = (e)=>{
    // console.log(subgredditdata[0].name)
    // console.log(subgredditdata[1].name)
    // var i=0
    axios.post("http://localhost:4000/api/removesubgreddit", {store : str , subgredditname : e.name})
    // console.log(subgredditdata.name)
    .then((val)=>{
        console.log("Removed SubGreddit")
        console.log(val.data.message)
        window.location.reload()
    }).catch((err)=>{
        console.log(err)
    })
}
  return (
    <div>
      <Navbar />
      <div>
      <h1 style={{color:"white"}}>This is MySubGreddit</h1>
                    <div class="card" style={{width:"18rem"}}>
                        <button class="btn btn-sm btn-outline-primary w-10" onClick={() => { navigate("/CreateSubGreddit")}}>Create a new SubGreddit</button>
                    </div>
                    <br></br>
        <div>
          {
            subgredditdata.map((val,index)=>{
                return (
                    <div class="card" style={{width:"18rem",marginTop : 20}}>
                        <div class="card-body">
                            <button class="btn btn btn-primary w-100" onClick={()=>{navigate("/submodule/"+val.name)}}>Open</button>
                          <h5 class="card-title" style={{color : "black"}} type="submit">Name : {val.name}</h5>
                              <p class="card-text" style={{color : "black"}}>Description : {val.description}</p>
                              <p class="card-text" style={{color : "black"}}>No. of People : {val.followers.length +1}</p>
                              <p class="card-text" style={{color : "black"}}>No. of Posts : {val.post.length}</p>
                              <p class="card-text" style={{color : "black"}}>Banned Keywords: {val.banned_keywords}</p>
                        </div>
                        <button class="btn btn-sm btn-outline-primary w-100" onClick={()=>{DeleteSubgreddit(val)}}>Delete SubGreddit</button>
                    </div>
                )
            })
          }
          </div>
          <br></br>
        </div>
    </div>
  );
};
export default MySubGreddit;