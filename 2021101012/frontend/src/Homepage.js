import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Homepage ()
{
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

  const str = window.localStorage.getItem("localstr");
  const [change,setchange] = useState("");
  const [subgredditdata,setsubgredditdata] = useState("");

  const handleSubmit = (e)=>{
    var val = e.target.value;
    setchange(val);
  }

    const search = ()=>{
        // console.log(change)
        axios.post("http://localhost:4000/api/search",{store : str , string : change})
        .then((res)=>{
            console.log(res.data.message)
            setsubgredditdata(res.data.message);
            console.log(subgredditdata.length)
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
            <Navbar/>
            <nav class="navbar navbar-dark bg-dark">
              <div class="container-fluid">
                <form class="d-flex input-group w-auto">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={handleSubmit} value={change}
                  />
                  <button type="button" class="btn btn-primary" onClick={search}>
                    <img src="Search.png" style={{width : 25}}/>
                  </button>
                </form>
                <div>
                {
                    subgredditdata.length === 0 ?
                    ""
                    :
                    <h5 type="submit" style={{color:"white"}} onClick={()=>{navigate("/Submodule/" + subgredditdata[0].name)}}>{subgredditdata[0].name}</h5>
                }
              </div>
              </div>
            </nav>
        </div>
    )
}
export default Homepage;