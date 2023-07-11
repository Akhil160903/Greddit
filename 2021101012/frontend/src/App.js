// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Login from './Login';
import Registration from "./Registration";
import Homepage from './Homepage';
import Update from './Update';
import Followers from './Followers';
import Following from './Following';
import Otherprofile from './Otherprofile';
import MySubGreddit from './MySubGreddit';
import CreateSubGreddit from './CreateSubGreddit';
import Joining from './Joining';
import ReportPage from './ReportPage';
import Submodule from './Submodule';
import Othersubmodule from './Othersubmodule';
import SubGreddit from './SubGreddit';
import Users from './Users';
// import { useNavigate } from 'react-router-dom';
function App() {
  const [currform, setcurrform] = useState('Login');
  const toggleForm = (formName) => {
    setcurrform(formName);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={currform === "Login" ? <Login onFormSwitch={toggleForm} /> : <Registration onFormSwitch={toggleForm} />}
          />
          <Route
            path="/Profile"
            element={<Profile />}
          />
          <Route
            path="/Update"
            element={<Update />}
          />
          <Route
            path="/Homepage"
            element={<Homepage />}
          /> 
          <Route
            path="/Followers"
            element={<Followers />}
          /> 
          <Route
            path="/Following"
            element={<Following />}
          />
          <Route
            path="/Otherprofile/:username"
            element={<Otherprofile />}
          />
          <Route
            path="/MySubGreddit"
            element={<MySubGreddit />}
          /> 
          <Route
            path="/CreateSubGreddit"
            element={<CreateSubGreddit />}
          /> 
          <Route 
              path="/Submodule/:name"
              element={<Submodule />}
          />
          <Route 
              path="/Joining/:name"
              element={<Joining />}
          />
          <Route 
              path="/Users/:name"
              element={<Users />}
          />
          <Route 
              path="/Othersubmodule/:name"
              element={<Othersubmodule />}
          />
          <Route 
              path="/Reportpage/:name"
              element={<ReportPage />}
          />
          <Route 
              path="/SubGreddit"
              element={<SubGreddit />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
