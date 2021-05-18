import React from 'react';
import SideBar from "./SideBar";
import ChatTab from "./ChatTab";
import ProtectedComponent from "./ProtectedComponent";

const Home = () => {
    return (
        <ProtectedComponent>
            <div style={{width: "100%", height: "100%"}} className="Home flex">
                <SideBar/>
                <ChatTab/>
            </div>
        </ProtectedComponent>
    );
};

export default Home;