import logo from './logo.svg';  // we can load any image as a variable and pass it as { logo } where ever any image is used
import './App.css';
import { useState, useEffect } from "react";
import {Routes, Route, Link} from "react-router-dom";
import { PopulateProjects, Home, Projects, Contact } from "./projects"

function App(props) {
  const [title, setTitle] = useState('');
  return (
    <>
      <nav>
      <Link to="" className="nav-link links">Home </Link>
      <Link to="projects" className="nav-link links">Projects </Link>
      <Link to="contact" className="nav-link links">Contact </Link>
      <p className="links nav-link" style={{backgroundColor: "skyblue"}}>user name :</p>
      <input className="nav-link links" onChange={event => setTitle(event.target.value)} />
    </nav>
    <div className="App App-header">
       <Routes>
          <Route path="/" element={<Home authorized={props.authorized} name ={title}/>}/>
          <Route path="/projects" element={<PopulateProjects name={title}/>}/>
          <Route path="/contact" element={<Contact date={new Date().getFullYear()}/>}/>
          <Route path="*" element={<Home authorized={props.authorized} name ={title}/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;
