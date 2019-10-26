import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import NavBar from "./components/NavBar";

function App() {
    return (

        <div>
            <NavBar></NavBar>
            <Button variant="contained" color="primary">
                Hello World
    </Button>
        </div>

    );
}

ReactDOM.render(<App />, document.querySelector("#app"));
