import React from 'react';
import Navbar from "./components/Navbar";
import Users from "./components/Users";

const App: React.FC = () => {
    return (
        <>
            <Navbar/>
            <div className="container">
                <Users/>
            </div>
        </>
    );
}

export default App;
