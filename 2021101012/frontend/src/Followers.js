import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';
// import "./followers.css"
// import "./profile.css"

function Followers() {
    const [follower, setfollower] = useState([]);
    const str = window.localStorage.getItem("localstr");
    useEffect(() => {
        axios.post("http://localhost:4000/api/getfollowerlist", { store: str })
            .then((res) => {
                setfollower(res.data.message);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="container">
            <div className="panel-heading">
                <h3 className="panel-title" style={{color:"white"}}> Followers
                </h3>
            </div>
            <div className="panel-body">
                <ul className="list-group list-group-dividered list-group-full">
                    <li className="list-group-item">
                        <div className="media">
                            <div className="media-body">
                                <div className="row">
                                    <div className="col">{follower.map((value, index) => {
                                        return (
                                            <div>
                                                <a type="submit" href={"/otherprofile/" + value}>{value}</a>
                                            </div>
                                        )
                                    })}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        //     <div>
        //     <Nav2/>
        //     {follower.map((value,index)=>{
        //         return (
        //             <div>
        //                 <a type="submit" href={"/otherprofile/" + value}>{value}</a>
        //             </div>
        //         )
        //     })}
        // </div>
    );
}
export default Followers;