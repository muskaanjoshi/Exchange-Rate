import React from "react";

const Title = props => (
  <div className="title">
    <h1>{props.title}</h1>
  </div>
);

Title.defaultProps = {
  title: "Convertibility @ Ease"
};

export default Title;
