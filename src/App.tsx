import React from "react";
import Projects from "./components/Projects";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1 className=" text-center text-xl my-8 font-semibold">
                Collaboration Hub
            </h1>
            <Projects />
        </div>
    );
};

export default App;
