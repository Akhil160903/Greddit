import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar';
function Update() {
    const navigate = useNavigate();
    var [newuser, setnewuser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        age: "",
        contact: "",
        pass: "",
    });

    const str = window.localStorage.getItem("localstr");
    useEffect(() => {
        axios.post("http://localhost:4000/api/getdata", { store: str }).then((res) => {
            var getdata = res.data.message;
            setnewuser(getdata);
        })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let name, value;
    const handleSubmit = (e) => {
        name = e.target.name;
        value = e.target.value;
        setnewuser({ ...newuser, [name]: value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/api/update", { store: str, user: newuser })
            .then((res) => {
                if (res.data.message === 1) {
                    console.log("Updated");
                    navigate("/Profile");
                }
                else {
                    alert("Please try again after sometime");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="nav--title">
            <Navbar />
            <div class="container mt-5 d-flex justify-content-center">

                <div class="card p-3">

                    <div class="d-flex align-items-center">

                        <div class="image">
                            <img src="./pp.jpeg" class="rounded" width="300" />
                        </div>

                        <div class="ml-3 w-100">
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <label class="labels" className="test">First Name</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        class="form-control"
                                        placeholder="first name"
                                        value={newuser.firstname}
                                        onChange={handleSubmit}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label class="labels" className="test">Last Name</label>
                                    <input
                                        name="lastname"
                                        type="text"
                                        class="form-control"
                                        value={newuser.lastname}
                                        placeholder="lastname"
                                        onChange={handleSubmit}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label class="labels" className="test">Age</label>
                                    <input
                                        name="age"
                                        type="text"
                                        class="form-control"
                                        value={newuser.age}
                                        placeholder="age"
                                        onChange={handleSubmit}
                                    />
                                </div>
                            </div>
                            <div class="button mt-2 d-flex flex-row align-items-center">
                                <button type="button" class="btn btn-sm btn-outline-primary w-100" onClick={handleClick}>Confirm Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Update;