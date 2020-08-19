import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "./FirebaseContext";
import ReactTooltip from "react-tooltip";

const Logout = (props) => {
  const firebase = useContext(FirebaseContext);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      firebase.signoutUser();
    }
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <div className="logoutContainer">
        <h2>{props.userData.pseudo}</h2>
        <label className="switch">
          <input onChange={handleChange} type="checkbox" checked={checked} />
          <span className="slider round" data-tip="Déconnexion"></span>
        </label>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </div>
    </>
  );
};

export default Logout;
