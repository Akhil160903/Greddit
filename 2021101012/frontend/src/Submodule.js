import React from "react";
import Navbar from "./Navbar.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav3 from "./Nav3.js";

function Submodule() {
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
        axios
          .post("http://localhost:4000/api/othersubgredditdata", {
            store: str,
            name: name,
            username: curruser.username,
          })
          .then((res) => {
            if (res.data.condtion === -1) {
              alert("DOES NOT EXIST");
              navigate("/profile");
            }
            var gredditdata = res.data.message;
            setsubgredditdata(gredditdata);
            console.log(subgredditdata)
            setpostdata(gredditdata.post); // for post data
            setpostusers(gredditdata.postuser);
            // console.log(postusers)
            var exist = res.data.condition;
            setexists(exist);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var [subgredditdata, setsubgredditdata] = useState({});
  var [exists, setexists] = useState(false);
  var [pending, setpending] = useState(false);

  const str = window.localStorage.getItem("localstr");

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/checkpending", { store: str, name: name })
      .then((res) => {
        if (res.data.message) {
          setpending(true);
        } else {
          setpending(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pendingreq = () => {
    axios
      .post("http://localhost:4000/api/pendingdata", {
        store: str,
        subgredditname: name,
      })
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { name } = useParams();

  // post data and comments from here to
  const [post, setpost] = useState("");
  const [postdata, setpostdata] = useState([]);
  const [postusers, setpostusers] = useState([]);

  let value;
  const handleSubmit = (e) => {
    value = e.target.value;
    setpost(value);
  };

  const newpost = () => {
    axios
      .post("http://localhost:4000/api/newpost", {
        store: str,
        name: name,
        post: post,
        username: curruser.username,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Report = (e)=>{
    const [report,setreport] = useState("");
    // console.log(report);
    let valuee;
    const Changereport = (e) => {
      valuee = e.target.value;
      console.log(e.postuser);
      setreport(valuee);
    };
    // console.log(postusers)
    const GotoReport = ()=>{
      axios.post("http://localhost:4000/api/report" , {store : str , post : e.value, username : curruser.username, reason : report , subgredditname : name , position : e.index})
      .then((res)=>{
        window.location.reload();
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
      <div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={"#reportModal" + e.index}
            style={{color:"white"}}
          >
            Report this post
          </button>

          <div
            class="modal fade"
            id={"reportModal" + e.index}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                <h6 style={{color : "Black"}}>Why do you want to report this post?</h6>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-footer">
                  <input onChange={Changereport} value={report} />
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={GotoReport}
                    style={{color:"white"}}
                  >
                    Send report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }



  const Important = (e) => {
    const [showcomments, setshowcomments] = useState([]);
    const [comment, setcomment] = useState("");
    // useEffect(() => {},[]);
      axios.post("http://localhost:4000/api/allcomments", {
        store: str,
        subgredditdata: name,
        index: e.index,
      })
      .then((res) => {
        setshowcomments(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });

    let cval;
    const handleComment = (e) => {
      cval = e.target.value;
      setcomment(cval);
    };

    const postcomments = (e) => {
      console.log(e);
      axios.post("http://localhost:4000/api/newcomments", {
          store: str,
          post: e.val,
          subgredditname: name,
          comment: comment,
          index: e.index,
        })
        .then((res) => {
          // console.log(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div>
        <Report index={e.index} value={e.val} />
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={"#commentsModal" + e.index}
          style={{color:"white"}}
        >
          Comments
        </button>
        {/* <br></br> */}
        <div
          class="modal fade"
          id={"commentsModal" + e.index}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{color:"black"}}>
                {showcomments.map((value, indexing) => {
                  return <p>{value}</p>;
                })}
                
              </div>

              <div class="modal-footer">
              <input
                  class="modal-title fs-5"
                  id="exampleModalLabel"
                  placeholder="Comment"
                  name="name"
                  value={comment}
                  onChange={handleComment}
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    postcomments({ val: e.val, index: e.index });
                  }}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // HERE
  return (
    <div>
      <Navbar />
      <div>
        <Nav3 user="active" />
      </div>
      <div>
        {curruser.username === subgredditdata.username ? (
          <button>JOINED</button>
        ) : exists ? (
          <button>JOINED</button>
        ) : (
          <button onClick={pendingreq} disabled={pending}>
            {pending ? "PENDING" : "JOIN"}
          </button>
        )}
      </div>

      {/* new data for posting */}
      {postdata.map((val, index) => {
        if(val==null)
        {
          return(
            <div>
              </div>
          )
        }
        else
        {
        return (
          <div style={{marginTop : 20}}>
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title" style={{ color: "black" }}>
                  Posted By: {postusers[index]}
                </h5>
                <p class="card-text" style={{ color: "black" }}>
                  Text : {val}
                </p>
                <p class="card-text" style={{ color: "black" }}>
                  Posted In : {subgredditdata.name}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-arrow-down-fill" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-arrow-up-fill" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z"/>
                </svg>
              </div>
              {/* {important({val : val , index : index})} */}
              <Important val={val} index={index} />
            </div>
          </div>
        );
        }
      })}

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add new post
      </button>

      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <input
                  class="modal-title fs-5"
                  id="exampleModalLabel"
                  placeholder="Post"
                  name="name"
                  value={post}
                  onChange={handleSubmit}
                />
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary" onClick={newpost}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Submodule;