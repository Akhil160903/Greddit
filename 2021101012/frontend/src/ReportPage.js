import axios from "axios";
import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav3 from "./Nav3";
import Navbar from "./Navbar";
function ReportPage (){

    const {name} = useParams();
    const [reports,setreports] = useState([]);
    
    // console.log(flag);
    const str = window.localStorage.getItem("localstr");

    const navigate = useNavigate;
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

    useEffect(()=>{
        axios.post("http://localhost:4000/api/allreport",{store:str , subgredditname : name})
        .then((res)=>{
            setreports(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const BlockUser = ()=>{

    }

    var [subgredditdata, setsubgredditdata] = useState([]);
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
    const ShowReports = (e)=>{
        const [flag,setflag] = useState(0);
        useEffect(()=>{
            axios.post("http://localhost:4000/api/ignore",{store : str ,subgredditname : e.val.subgredditname, post : e.val.post, position:e.val.position,reason:e.val.reason})
            .then((res)=>{
                console.log(res.data.message.ignore);
                if(res.data.message.ignore === 1)
                {
                    setflag(1);
                }
                else{
                    setflag(0);
                }
            }).catch((err)=>{
                console.log(err)
            })
        },[])

        const Updateignore = ()=>{
            axios.post("http://localhost:4000/api/updateignore" , {store : str , subgredditname : e.val.subgredditname, post : e.val.post , position : e.val.position,reason : e.val.reason})
            .then((res)=>{
                if(res.data.message.ignore === 1)
                {
                    setflag(1);
                }
                else
                {
                    setflag(0);
                }
            }).catch((err)=>{
                console.log(err)
            })
        }

        const DeletePost = ()=>{
            axios.post("http://localhost:4000/api/removepost", {store : str ,reportindex : e.index , otherindex : e.val.position , subgredditname : e.val.subgredditname, post : e.val.post})
            .then((val)=>{
                navigate("/submodule/" + name)
                window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
        }
        const BlockUser = ()=>{
            axios.post("http://localhost:4000/api/blockuser", {store : str ,reportindex : e.index , otherindex : e.val.position , subgredditname : e.val.subgredditname, post : e.val.post, username : e.val.username})
            .then((val)=>{
                if(val.data.message === 1)
                {
                    window.location.reload()
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        // const ignore = ()=>{
        //     // setflag(1);
        //     axios.post("http://localhost:4000/api/ignore", {store : str ,reportindex : e.index , otherindex : e.val.position })
        //     .then((val)=>{
        //         console.log(val.data.message)
        //     }).catch((err)=>{
        //         console.log(err)
        //     })
        // }
        return(
           
            
            <div class="card my-5 w-50 ">
              <h5 class="card-header">
                  Reported By : {e.val.username}
              </h5>
                <div class="card-body">
                    <h5 class="card-title">Reported User : {e.val.postuser} </h5>
                    {/* {console.log(subgredditdata.username)} */}
                    <p class="card-text">Subgreddit Name : {e.val.subgredditname}</p>
                    <p class="card-text">Text of Post : {e.val.post}</p>
                    <p class="card-text">Concern : {e.val.reason}</p>
                    {/* <p class="card-text">Text of Post : post.text </p> */}
                    {flag === 1 ? 
                        <div>
                        <button class="btn btn btn-outline-primary w-100" type="submit">Ignore</button>
                        <button class="btn btn btn-outline-primary w-100" type="submit" disabled="true">Block</button>
                        <button class="btn btn btn-outline-primary w-100" type="submit" disabled="true">Delete Post</button> </div> 
                        : 
                        <div>
                        <button class="btn btn btn-outline-primary w-100" type="submit" onClick={Updateignore}>Ignore</button>
                        <button class="btn btn btn-outline-primary w-100" type="submit" onClick={BlockUser}>Block</button>
                        <button class="btn btn btn-outline-primary w-100" type="submit" onClick={DeletePost}>Delete Post</button>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }

    return(
        <div>
          <Navbar />
          <Nav3/>
            <div style={{color:"black"}}>
                {reports.map((val,index)=>{
                    return(
                        <ShowReports val={val} index={index}/>
                    )
                })}
            </div>
        </div>
    )
}
export default ReportPage;