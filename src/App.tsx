import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./pages/home/home";
import { Login } from "./pages/login";
import { Navbar } from "./components/navbar";
import { AddPost} from "./pages/addpost/addpost";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={< Home />}/>
          <Route path="/login" element={< Login />}/>
          <Route path="/addpost" element={< AddPost />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
