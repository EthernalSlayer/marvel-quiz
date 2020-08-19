import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [btn, setBtn] = useState(false);

  const refWolverine = useRef(null);

  useEffect(() => {
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 2000);
  }, []);

  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
    refWolverine.current.classList.remove("rightImg");
  };

  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
    refWolverine.current.classList.remove("leftImg");
  };

  return (
    <main ref={refWolverine} className="welcomePage">
      {btn && (
        <>
          <div className="leftBox" onMouseOver={setLeftImg}>
            <Link className="btn-welcome" to="/signup">
              Inscription
            </Link>
          </div>
          <div className="rightBox" onMouseOver={setRightImg}>
            <Link className="btn-welcome" to="/login">
              Connexion
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default Landing;
