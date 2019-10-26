import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
    return (
        <React.Fragment>
        {/* <NavBar></NavBar> */}
        <Dashboard></Dashboard>
        </React.Fragment>
        
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));
