import React, {useEffect, useState} from 'react';
import AllChats from "./AllChats";
import TopNav from "./TopNav";
import '../scss/SideBar.scss';
import {Add, Close, MoreHoriz} from "@material-ui/icons";
import {useSelector} from "react-redux";
import AddFriend from "./AddFriend";
import {IconButton} from "@material-ui/core";
import apis from "../../api/api";

const SideBar = () => {
    const {user} = useSelector(state => state.chatAppReducer);

    const [requests, setRequests] = useState([]);

    const [searchFriend, setSearchFriend] = useState(false);

    const buttons = [
        <IconButton  key={1} onClick={() => {
            setSearchFriend(!searchFriend)
        }} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            {
                !searchFriend ? <Add/> : <Close/>
            }
        </IconButton>,
        <IconButton key={2} onClick={() => {
            console.log("I am not set yet")
        }} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            <MoreHoriz/>
        </IconButton>
    ];

    useEffect(() => {
        if (user) {
            const requests = {
                requests: user.requests
            }
            apis.getRequestUser(requests).then(r => {
                setRequests(r.data.users);
            }).catch(err => {
                console.log(err)
            })
        }
    }, [user]);

    const handleRequest = (id, type) => {
        const request = {
            id: id,
            type: type
        }
        apis.confirmReq(request).then(r => {
            console.log(r)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={"SideBar flex flex-col"}>
            <TopNav user={user} buttons={buttons}/>
            <div className="inputBox SideBar-search flex flex-ai-c flex-jc-c">
                <input type="search" placeholder={"Search or Start a new Chat"}/>
            </div>
            <AllChats/>
            <AddFriend display={searchFriend}
                       handleRequest={handleRequest}
                       requests={requests}
                       close={() => {
                           setSearchFriend(false)
                       }}/>

        </div>
    );
};

export default SideBar;