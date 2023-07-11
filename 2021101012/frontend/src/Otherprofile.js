import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "./profile.css"

function Otherprofile (){
    // console.log(User);
    const { username } = useParams();
    const navigate = useNavigate();
    var [curruser, setcurruser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        age: "",
        contact: "",
        pass: "",
    });

    var [profiledata, setprofiledata] = useState({
        username: "",
        followers: [],
        following: [],
        // About : "",
    });

    const str = window.localStorage.getItem("localstr");
    useEffect(() => {
        axios.post("http://localhost:4000/api/getdataotherprofile", { store: str, name: username }).then((res) => {
            var getdata = res.data.message;
            var pdata = res.data.profile;
            console.log(pdata)
            setcurruser(getdata);
            setprofiledata(pdata);
        })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    // if(window.localStorage.getItem("log") == null)
    // {
    //     navigate("/");
    // }});
    const followreq = () => {
        axios.post("http://localhost:4000/api/followerandfollowing", { store: str, username: username })
            .then((res) => {
                if (res.data.message === true) {
                    console.log("Follwing done");
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const Unfollowreq = () => {
        axios.post("http://localhost:4000/api/unfollowing", { store: str, username: username })
            .then((res) => {
                // console.log(username)
                if (res.data.message === true) {
                    console.log("Unfollwing done");
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const [buttonchange, setbuttonchange] = useState()
    useEffect(() => {
        axios.post("http://localhost:4000/api/checkfollowers", { store: str, username: username }).then((res) => {
            if (res.data.message === true) {
                setbuttonchange(true);
            }
            else {
                setbuttonchange(false);
            }
        })
    }, [])

    const RemoveFollower = () => {
        axios.post("http://localhost:4000/api/removefollowers", { store: str, username: username })
            .then((res) => {
                // console.log(username)
                if (res.data.message === true) {
                    console.log("Removing done");
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    // const [buttonchange1, setbuttonchange1] = useState()
    // useEffect(() => {
    //     axios.post("http://localhost:4000/api/checkfollowers", { store: str, username: username }).then((res) => {
    //         if (res.data.message === true) {
    //             setbuttonchange1(true);
    //         }
    //         else {
    //             setbuttonchange1(false);
    //         }
    //     })
    // }, [])

    return (
        <div className="nav--title">
            <Navbar />
            <div class="container mt-5 d-flex justify-content-center">

                <div class="card p-3">

                    <div class="d-flex align-items-center">

                        {/* <div class="image">
                            <img src="./pp.jpeg" class="rounded" width="300" />
                        </div> */}

                        <div class="ml-3 w-100">

                            <h4 class="mtest">{curruser.firstname + " " + curruser.lastname}</h4>
                            {/* <span class="mtest">Actress</span> */}
                            {/* <div>
                                <label className="test">Username</label>
                                <a type="text" className="form-control">{curruser.username}</a>
                            </div>
                            <div>
                                <label className="test">Email</label>
                                <a type="text" className="form-control">{curruser.email}</a>
                            </div>
                            <div>
                                <label className="test">Age</label>
                                <a type="text" className="form-control">{curruser.age}</a>
                            </div> */}

                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">

                                <div class="d-flex flex-column">

                                    <span class="test">Posts</span>
                                    <span class="number1"><center><b>3</b></center></span>

                                </div>
                                <div class="d-flex flex-column">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                        Followers
                                    </a>
                                    <a>{profiledata.followers.length}</a>
                                    {/* <a><center>4</center></a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" >Robert</a></li>
                                        <li><a className="dropdown-item" >Chris Evans</a></li>
                                        <li><a className="dropdown-item" >Scarlet</a></li>
                                        <li><a className="dropdown-item" >Brie</a></li>
                                    </ul> */}
                                </div>
                                <div class="d-flex flex-column">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                        Following
                                    </a>
                                    <a>{profiledata.following.length}</a>
                                    {/* <a><center>4</center></a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" >Robert</a></li>
                                        <li><a className="dropdown-item" >Chris Evans</a></li>
                                        <li><a className="dropdown-item" >Scarlet</a></li>
                                        <li><a className="dropdown-item" >Brie</a></li>
                                    </ul> */}
                                </div>

                            </div>
                            {buttonchange === true ? <button onClick={Unfollowreq}>Unfollow</button> : <button onClick={followreq}>Follow</button>}
                            <button onClick={RemoveFollower}> Remove Follower </button>
                            {/* {buttonchange1 === true ? <button onClick={Unfollowreq}>Remove Follower</button> : <button type="button" disabled>Follow</button>} */}
                            {/* <div class="button mt-2 d-flex flex-row align-items-center">
                                <button type="button" class="btn btn-sm btn-outline-primary w-100" onClick={() => { navigate("/Update") }} >Edit Profile</button>
                            </div> */}
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}
export default Otherprofile;