import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import signup from "./components/SignUp/SignUp";
import signinPage from "./components/SignIn/SignIn";
import DashBoard from "./pages/DashBoard";
import emailPage from "./pages/EmailPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthState from "./auth/AuthState";
import setToken from "./auth/setToken";
import ProfilePage from "./components/NewContact/UserProfile";
import Contact from "./pages/Contact";
if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AuthState>
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/signin" component={signinPage} exact />
            <Route path="/signup" component={signup} exact />
            <Route path="/dashboard" component={DashBoard} exact />
            <Route path="/email" component={emailPage} exact />
            <Route path="/profile/:id" component={ProfilePage} exact />
            <Route path="/contact" component={Contact} exact />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;
