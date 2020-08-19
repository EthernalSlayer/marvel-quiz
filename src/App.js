import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IconContext } from "react-icons";
import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ErrorPage from "./components/ErrorPage";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
        </IconContext.Provider>
      </Router>
    </div>
  );
}

export default App;
