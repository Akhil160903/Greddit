import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";



function Nav3() {
  // console.log(props)
    const {name} = useParams();
    // console.log(name);
    const navigate = useNavigate();
    var [subgredditdata, setsubgredditdata] = useState([]);

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
      .post("http://localhost:4000/apigetdata", { store: str })
      .then((res) => {
        var getdata = res.data.message;
        setcurruser(getdata);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  // var [currsubgredditdata,currsetsubgredditdata] = useState({
  //   username : curruser.username,
  //   name : "",
  //   followers : "",
  //   post : "",
  //   description : "",
  //   date : new Date(),
  //   tags : [],
  //   bannedKeywords : []    
  // })

  const str = window.localStorage.getItem("localstr");
  

  useEffect(() => {
    axios
      .post("http://localhost:4000/apigetsubgredditdata", { store: str })
      .then((res) => {
        var gredditdata = res.data.message;
        setsubgredditdata(gredditdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="fixedcollapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"  onClick={()=>{navigate("/submodule/"+name)}}>
                <a style={{color:"white"}} className="nav-link">Home</a>
              </li>
              <li className="nav-item" onClick={()=>{navigate("/users/"+name)}}>
                <a style={{color:"white"}} className="nav-link">User</a>
              </li>
              <li  className="nav-item" onClick={()=>{navigate("/joining/"+name)}}>
                <a style={{color:"white"}} className="nav-link">Joining</a>
              </li>
              <li className="nav-item" onClick={()=>{navigate("/reportpage/" + name)}} >
                <a style={{color:"white"}} className="nav-link">Report</a>
              </li>
              
              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Nav3;

