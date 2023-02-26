import React from "react";
import "./App.css";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
    return (
        <div className='App'>
            <GlobalStyle />
            <Home />
        </div>
    );
}

export default App;
