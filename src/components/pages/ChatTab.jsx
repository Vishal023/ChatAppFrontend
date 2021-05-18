import React, {useEffect, useState} from 'react';
import '../scss/ChatTab.scss';
import {MoreHoriz, Search, Send} from "@material-ui/icons";
import {Button, IconButton, TextareaAutosize} from "@material-ui/core";
import TopNav from "./TopNav";
import {useSelector} from "react-redux";

const ChatTab = () => {
    const [active, setActive] = useState(false);

    const buttons = [

        <IconButton key={3} onClick={()=>{ console.log("I am not set yet")}} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            <Search/>
        </IconButton>,
        <IconButton key={4} onClick={()=>{ console.log("I am not set yet")}} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            <MoreHoriz/>
        </IconButton>,

    ];

    const {chatUser} = useSelector(state => state.chatAppReducer);
    useEffect(() => {
        if (chatUser !== null) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [chatUser]);
    return (
        <div className={"ChatTab flex flex-ai-c flex-jc-c"}>
            {
                !active
                    ?
                    <>
                        <p>Click on a chat to start chatting</p>
                    </>
                    :
                    <div className="Chat flex flex-col">
                        <TopNav user={chatUser} buttons={buttons}/>
                        <div className="Chat-message flex flex-col">
                            <p className={"Message receiver"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Alias natus provident voluptatibus!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit.</p>
                            <p className={"Message sender"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Architecto consectetur corporis eligendi mollitia nihil reiciendis!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Alias natus provident voluptatibus!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit.</p>
                            <p className={"Message sender"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Architecto consectetur corporis eligendi mollitia nihil reiciendis!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Alias natus provident voluptatibus!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit.</p>
                            <p className={"Message sender"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Architecto consectetur corporis eligendi mollitia nihil reiciendis!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Alias natus provident voluptatibus!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit.</p>
                            <p className={"Message sender"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Architecto consectetur corporis eligendi mollitia nihil reiciendis!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Alias natus provident voluptatibus!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit.</p>
                            <p className={"Message sender"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Architecto consectetur corporis eligendi mollitia nihil reiciendis!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Alias natus provident voluptatibus!</p>
                            <p className={"Message receiver"}>Lorem ipsum dolor sit.</p>
                            <p className={"Message sender"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Architecto consectetur corporis eligendi mollitia nihil reiciendis!</p>
                        </div>
                        <div className="Message-type flex flex-ai-c flex-jc-c">
                            <TextareaAutosize rowsMin={1} rowsMax={1} placeholder="Type a message"/>
                            <Button size={"large"} disableRipple>
                                <Send/>
                            </Button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ChatTab;