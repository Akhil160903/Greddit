import React from "react";
import { useParams } from "react-router-dom";
import Nav3 from "./Nav3";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect , useState} from "react";

function Users (){
  const str = window.localStorage.getItem("localstr");
  var [subgredditdata, setsubgredditdata] = useState([]);
  var [currsubgreddit,setcurrsubgreddit] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:4000/api/getjoiningdata" , {store  : str , name : name})
    .then((res)=>{
      setsubgredditdata(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

    const {name} = useParams();

    const acceptdata = (e)=>{
      axios.post("http://localhost:4000/api/acceptuser" , {store : str , data : {username : e , subgredditname : name}})
      .then((res)=>{
        console.log(res.data.message);
        window.location.reload();
      }).catch((err)=>{
        console.log(err);
      })
    }

    const rejectdata = (e)=>{
      axios.post("http://localhost:4000/api/rejectuser" , {store : str , data : {username : e , subgredditname : name}})
      .then((res)=>{
        window.location.reload();
      }).catch((err)=>{
        console.log(err);
      })
    }

    useEffect(()=>{
      axios.post("http://localhost:4000/api/getsubgredditdata", {
          store: str,
        })
        .then((res) => {
          if(res.data.condtion === -1)
          {
            alert("DOES NOT EXIST");
            // navigate("/profile");
          }
          var gredditdata = res.data.message;
          var newdata = gredditdata.filter((e)=>{
            return e.name === name;
          })
          setcurrsubgreddit(newdata);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])


    return (
        <div>
          <Navbar />
          <div>
            <Nav3 />
          </div>
          <div>
            <h1 style={{color:"white"}}>FOLLOWERS NOT BLOCKED</h1>
            {currsubgreddit.map((res,index)=>{
              return (
                <div>
                  {/* { console.log(res.followers) } */}
                 
                  { res.followers.map((yo,i)=>{
                    {console.log(yo)}
                      return(<h5 style={{color:"white"}} key={i}>{yo}</h5>)
                    }
                  )}
                  {/* <h5 style={{color:"white"}}>{res.followers} </h5> */}
                  <br/>
                </div>
              )
            })}
          </div>
          
        </div>
    );
}
export default Users;