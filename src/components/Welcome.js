import React, { useState, useContext, useEffect } from "react";
import FirebaseContext from "./FirebaseContext";
import Logout from "./Logout";
import Quiz from "./Quiz";
import Loader from "./Loader";

const Welcome = (props) => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });

    if (userSession !== null) {
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      listener();
    };
  }, [userSession]);

  return userSession === null ? (
    <Loader
      loadingMsg={"Loading..."}
      styling={{ textAlign: "center", color: "white" }}
    />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout userData={userData} />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
