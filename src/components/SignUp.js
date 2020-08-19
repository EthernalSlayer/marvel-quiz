import React, { useState, useContext } from "react";
import FirebaseContext from "./FirebaseContext";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const firebase = useContext(FirebaseContext);
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .signupUser(loginData.email, loginData.password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          pseudo: loginData.pseudo,
          email: loginData.email,
        });
      })
      .then(() => {
        setLoginData({ ...data });
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const btn =
    loginData.pseudo === "" ||
    loginData.email === "" ||
    loginData.password === "" ||
    loginData.password !== loginData.confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  //gestion erreur
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={loginData.pseudo}
                  type="text"
                  id="pseudo"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={loginData.email}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email">email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={loginData.password}
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="password">mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={loginData.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  required
                />
                <label htmlFor="confirmPassword">confirmer mot de passe</label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
