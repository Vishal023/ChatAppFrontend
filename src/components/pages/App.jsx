import React from 'react';
import '../scss/App.scss';
import SideBar from "./SideBar";
import ChatTab from "./ChatTab";
import ProtectedComponent from "./ProtectedComponent";

const App = () => {
    return (
        <ProtectedComponent>
            <div className="App flex">
                <SideBar/>
                <ChatTab/>
            </div>
        </ProtectedComponent>
    );
}

export default App;