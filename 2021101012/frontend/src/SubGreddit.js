
import React from "react";
import Navbar from "./Navbar.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Homepage from "./Homepage.js";

function SubGreddit()  {

  const navigate = useNavigate();
  var [subgredditdata, setsubgredditdata] = useState([]);

  const str = window.localStorage.getItem("localstr");
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getallsubgredditdata", { store: str })
      .then((res) => {
        var gredditdata = res.data.message;
        setsubgredditdata(gredditdata);
        console.log(subgredditdata[0].name)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Homepage/>
      <div>
      <h1 style={{color:"white"}}>This is SubGreddit</h1>
        <div>
          {
            subgredditdata.map((val,index)=>{
                return (
                    <div class="card" style={{width:"18rem", marginTop : 20}}>
                        <div class="card-body">
                            <button class="btn btn btn-primary w-100" onClick={()=>{navigate("/submodule/"+val.name)}}>Open</button>
                          <h5 class="card-title" style={{color : "black"}} type="submit">Name : {val.name}</h5>
                              <p class="card-text" style={{color : "black"}}>Description : {val.description}</p>
                              <p class="card-text" style={{color : "black"}}>No. of People : {val.followers.length +1}</p>
                              <p class="card-text" style={{color : "black"}}>No. of Posts : {val.post.length}</p>
                              <p class="card-text" style={{color : "black"}}>Banned Keywords: {val.banned_keywords}</p>
                        </div>
                        {/* <button class="btn btn-sm btn-outline-primary w-100" onClick={()=>{DeleteSubgreddit(val)}}>Delete SubGreddit</button> */}
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
export default SubGreddit;