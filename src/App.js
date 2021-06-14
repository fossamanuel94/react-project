import "./App.css";
import Login from "./users/Login";
import Navbar from "./Navbar";
import Registro from "./users/Registro";
import CreatePosts from "./posts/CreatePosts";
import PostsList from "./PostsList";
import SelectedPost from "./posts/SelectedPost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useEffect, useState } from 'react';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="jumbotron jumbotron-fluid w-75">
        <div className="container w-75">         
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
