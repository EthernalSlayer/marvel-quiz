import React from "react";
import Stepper from "react-stepper-horizontal";

const Levels = (props) => {
  return (
    <div className="levelsContainer">
      <Stepper
        steps={[
          { title: "DEBUTANT" },
          { title: "CONFIRME" },
          { title: "EXPERT" },
        ]}
        activeStep={props.level}
        circleTop={0}
        size={64}
        defaultColor={"white"}
        activeColor={"red"}
        completeColor={"red"}
        circleFontColor={"black"}
        defaultBarColor={"white"}
        completeBarColor={"red"}
        circleFontSize={24}
        titleFontSize={24}
      />
    </div>
  );
};

export default React.memo(Levels);
