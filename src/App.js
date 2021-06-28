import "./App.css";
import Login from "./users/Login";
import Navbar from "./Navbar";
import Registro from "./users/Registro";
import CreatePosts from "./posts/CreatePosts";
import PostsList from "./posts/PostsList";
import SelectedPost from "./posts/SelectedPost";
import CategoriePostList from './CategoriePostList'
import SideBar from './SideBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useEffect, useState } from 'react';

function App() {
  return (
    <Router>
      <div className="row">
        <div className="col">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <SideBar></SideBar>
        </div>
      <div className="col-10">
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
  );
}

export default App;
