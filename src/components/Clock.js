import React from "react";
import "../components/css/base.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString("en-GB")
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }
  render() {
    return (
      <div className="timeDateDependents">
        <p>You're on time: {this.state.time}</p>
        <p>Today's Date: {this.state.date}</p>
        <hr />
      </div>
    );
  }
}
export default Clock;
