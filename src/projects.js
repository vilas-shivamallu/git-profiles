import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";


export function Header(props) {
    const blog = /^(http|https)/.test(props.blog) ? props.blog : `https://${props.blog}`;
    const profile = `https://${props.login}.github.io`;
    const gitProfile = `https://github.com/${props.login}`;
    return (
      <header>
        <h1> <a href={gitProfile} className="links" target="_blank">{props.name}</a></h1>
        <h2> <a href={profile} className="links" target="_blank">Profile</a></h2>
        { props.blog ? <h2> <a href={blog} className="links" target="_blank">blog</a></h2> : ''}
      </header>
    );
  }
  
export function Projects(props) {
    return (
      <>
        <h1>Projects</h1>
        <ul>
        { props.list.map((item) => <li key={item.id}><a href={item.link} className="links" target="blank">{ item.title }</a></li>) }
        </ul>
      </>
    );
  }
  
export function Contact(props) {
    return (
      <footer  className="App-link">
        <h3> Its all for good : {props.date}</h3>
      </footer>
    );
  }
  
export function Home(props) {
      const [data, setData] = new useState(null);
      const [loading, setLoading] = new useState(false);
      const [error, setError] = new useState(null);
  
      useEffect(()=> {
        if (!props.name) return;
        setLoading(true);
        fetch(`https://api.github.com/users/${props.name}`)
        .then((response)=> response.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError)
      },[props.name]);
      if (loading) return (<><img src={logo} className="App-logo" height={200} alt="loading"/><h3>...loading</h3></>)
      if (error) return <p> {error} </p>
      if(!data) {
        return null;
      }
      console.log(data);
      return (
            <>
            <img src={data.avatar_url} height={200} alt="github profile " style={{borderRadius: 10}}/>
              { props.authorized ? <Header login={data.login} name={data.name} blog={data.blog}/> :
              <Header name="Anonymous"/>
              }
            </>
          );
  }
  
  // const list = [
  //   "Profile",
  //   "Project One", 
  //   "Music", 
  //   "SVAR",
  //   "Angular one", 
  //   "Insurance Claim System"];
  
  //   const links = [
  //     "https://vilas-shivamallu.github.io/",
  //     "https://bunny007.pythonanywhere.com/", 
  //     "https://vilas-shivamallu.github.io/music/",
  //     "https://vilas-shivamallu.github.io/UI5-SVAR/webapp/",
  //     "https://angularp1.netlify.app/",
  //     "https://vilas-shivamallu.github.io/insuranceClaim/#"
  //   ]
  
  // const listObj = list.map((item, i) => ({id: i, title: item, link: links[i]}));
/* <Route path="/projects" element={<Projects list={listObj}/>}/> */
export function PopulateProjects(props) {
    const [data, setData] = new useState(null);
    const [loading, setLoading] = new useState(false);
    const [error, setError] = new useState(null);

    useEffect(()=> {
      if (!props.name) return;
      setLoading(true);
      fetch(`https://api.github.com/users/${props.name}/repos`)
      .then((response)=> response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
    },[props.name]);
    if (loading) return (<><img src={logo} className="App-logo" height={200} alt="loading"/><h3>...loading</h3></>)
    if (error) return <p> {error} </p>
    if(!data) {
      return null;
    }   

    var list = data.filter((repo) => !repo.fork && (repo.homepage != null && repo.homepage != '')).map((repo, id) => ({id: id, link: repo.homepage, title: repo.name}));

    var repos = data.filter((repo) => !repo.fork).map((repo, id) => ({id: id, link: repo.clone_url, title: repo.name}));

    return (
        <>
        {(!list.length) ? <h1>No projects Deployed</h1> : <h1>Projects</h1>}
          <ul>
          { list.map((item) => <li key={item.id}><a href={item.link} className="links" target="_blank">{ item.title }</a></li>) }
          </ul>
          {(!repos.length) ? <h1>No Repositories</h1> : <h1>Repositories</h1>}
          <ul>
          { repos.map((item) => <li key={item.id}><a href={item.link} className="links" target="_blank">{ item.title }</a></li>) }
          </ul>
        </>
      );

}