import "./App.css";
import Login from "./users/Login";
import Navbar from "./Navbar";
import Registro from "./users/Registro";
import CreatePosts from "./posts/CreatePosts";
import PostsList from "./posts/PostsList";
import SelectedPost from "./posts/SelectedPost";
import CategoriePostList from './posts/CategoriePostList'
import SideBar from './sidebar/SideBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext, useState } from 'react';

export const userContext = createContext(null)


function App() {

  const [userState, setUserState] = useState(null)

  return (
    <userContext.Provider value={{userState, setUserState}}>
    <Router>
      <div className="row">
        <div className="col">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="row">
      <div className="col">
      <div className="jumbotron jumbotron-fluid bg-white">
        <div className="container"> 
          <Switch>
            <Route path="/post/:id">
              <SelectedPost></SelectedPost>
            </Route>
            <Route exact path="/">
              <PostsList></PostsList>
            </Route>
            <Route path="/sign-in">
              <Registro></Registro>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/new-post">
              <CreatePosts></CreatePosts>
            </Route>
            <Route path="/categorie-post/:id">
              <CategoriePostList></CategoriePostList>
            </Route>
          </Switch>
        </div>
      </div>
      </div>
      </div>
      <div className="row">
        <div className="col"></div>
      </div>
    </Router>
    </userContext.Provider>
  );
}

export default App;
