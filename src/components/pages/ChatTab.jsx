import React, {useEffect, useState} from 'react';
import '../scss/ChatTab.scss';
import {MoreHoriz, Search, Send} from "@material-ui/icons";
import {Button, IconButton, TextareaAutosize} from "@material-ui/core";
import TopNav from "./TopNav";
import {useSelector} from "react-redux";
import apis from "../../api/api";
import Messages from "./Messages";
import Pusher from "pusher-js";

const ChatTab = () => {
    const [active, setActive] = useState(false);
    const [conversationId, setConversationId] = useState("");
    const [chat, setChat] = useState("");
    const [reload, setReload] = useState(false);
    const [newMessage, setNewMessage] = useState({});

    const buttons = [

        <IconButton key={3} onClick={() => {
            console.log("I am not set yet")
        }} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            <Search/>
        </IconButton>,
        <IconButton key={4} onClick={() => {
            console.log("I am not set yet")
        }} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            <MoreHoriz/>
        </IconButton>,

    ];

    const {chatUser} = useSelector(state => state.chatAppReducer);
    const {user} = useSelector(state => state.chatAppReducer);


    useEffect(() => {
        setChat("");
        if (chatUser !== null) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [chatUser]);
    useEffect(() => {
        if (chatUser != null && user != null) {
            const userId = user._id;
            const charUserId = chatUser._id;
            if (userId.localeCompare(charUserId) >= 0) {
                setConversationId(user._id + chatUser._id);
            } else {
                setConversationId(chatUser._id + user._id);
            }
        } else {
            setConversationId("");
        }
    }, [chatUser, user]);

    useEffect(() => {

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {cluster: process.env.REACT_APP_PUSHER_CLUSTER});
        const channel = pusher.subscribe('post-events_' + conversationId);

        channel.bind('postAction', (data) => {
            const {newMessage} = data;
            setNewMessage(newMessage);
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

    }, [conversationId]);


    const triggerReload = async () => {
        setReload(!reload);
    }

    const sendMessage = () => {
        if (chatUser != null && user != null && chat !== "") {
            const messagePacket = {
                id_sender: user._id,
                id_receiver: chatUser._id,
                body: chat,
            }
            apis.sendMessage(messagePacket, conversationId)
                .then(async (res) => {
                    if (res.data.status) {
                        await triggerReload();
                        setChat("");
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    };


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
                        <Messages reload={reload}
                                  receiver={chatUser._id}
                                  sender={user._id}
                                  newMessage={newMessage}
                                  conversationId={conversationId}/>
                        <div className="Message-type flex flex-ai-c flex-jc-c">
                            <TextareaAutosize rowsMin={1} rowsMax={1}
                                              value={chat} onChange={(e) => {
                                setChat(e.target.value)
                            }}
                                              onKeyUp={(e) => {
                                                  e.code === "Enter" && sendMessage()
                                              }}
                                              placeholder="Type a message"/>
                            <Button size={"large"} onClick={sendMessage} disableRipple>
                                <Send/>
                            </Button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ChatTab;