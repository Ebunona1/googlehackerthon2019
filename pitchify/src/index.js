import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <React.Fragment>
      <Dashboard ></Dashboard>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
