import React from "react";
import { Column, Row } from "simple-flexbox";

// import "../css/title.css";
import Title from "../Title";

class ColDivs extends React.Component {
  render() {
    return (
      <Column flexGrow={1}>
        <Row horizontal="center">
          <h1>
            <Title />
          </h1>
        </Row>
        <Row vertical="center">
          <Column flexGrow={1} horizontal="center">
            <h3>Col1</h3>
            <span>col1 content</span>
          </Column>
          <Column flexGrow={1} horizontal="center">
            <h3>Column 2</h3>
            <span>Column 2 content</span>
          </Column>
        </Row>
      </Column>
    );
  }
}

export default ColDivs;
