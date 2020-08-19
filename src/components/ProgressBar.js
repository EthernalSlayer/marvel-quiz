import React from "react";

const ProgressBar = (props) => {
  const getPercent = (totalQuestions, question) => {
    return (100 / totalQuestions) * question;
  };
  const progressPercent = getPercent(props.maxQuestion, props.idQuestion);
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">
          {`Question: ${props.idQuestion}/${props.maxQuestion}`}
        </div>
        <div className="progressPercent">
          {`Progression: ${progressPercent}%`}
        </div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
