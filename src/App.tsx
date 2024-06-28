import React from "react";
import Projects from "./components/Projects";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1 className="my-8 text-xl font-semibold text-center ">
                Collaboration Hub
            </h1>
            <Projects />
        </div>
    );
};

export default App;
