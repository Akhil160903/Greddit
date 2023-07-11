import axios from "axios";
import React , {useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
function Following()
{
    // const navigate = useNavigate;
    const [following,setfollowing] = useState([]);

    const str = window.localStorage.getItem("localstr");

    useEffect(()=>{
        axios.post("http://localhost:4000/api/getfollowinglist",{store : str})
        .then((res)=>{
            setfollowing(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    })

    return (
        <div className="container">
            <div className="panel-heading">
                <h3 className="panel-title" style={{color:"white"}}> Following
                </h3>
            </div>
            <div className="panel-body">
                <ul className="list-group list-group-dividered list-group-full">
                    <li className="list-group-item">
                        <div className="media">
                            <div className="media-body">
                                <div className="row">
                                    <div className="col">{following.map((value, index) => {
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
    );
}
export default Following;