import React, {useEffect, useRef, useState} from 'react';
import '../scss/ChatTab.scss';
import {ArrowBack, Chat, MoreHoriz, Search, Send} from "@material-ui/icons";
import {Button, IconButton, TextareaAutosize} from "@material-ui/core";
import TopNav from "./TopNav";
import {useDispatch, useSelector} from "react-redux";
import apis from "../../api/api";
import Messages from "./Messages";
import Pusher from "pusher-js";
import {setCurrentUser, toggleDisplay} from "../../actions/action";

const ChatTab = () => {
    const [conversationId, setConversationId] = useState("");
    const [chat, setChat] = useState("");
    const [newMessage, setNewMessage] = useState({});
    const {userDisplay: display} = useSelector(state => state.chatAppReducer);

    const dispatch = useDispatch();

    const buttons = [
        <IconButton key={5} onClick={() => {
            dispatch(toggleDisplay(false));
        }} style={{backgroundColor: "transparent", color: "#333"}} size={"medium"}>
            <ArrowBack/>
        </IconButton>,
    ];

    const {chatUser} = useSelector(state => state.chatAppReducer);
    const {user} = useSelector(state => state.chatAppReducer);

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


    const sendMessage = () => {
        if (chatUser !== null && user != null && chat !== "") {
            const messagePacket = {
                id_sender: user._id,
                id_receiver: chatUser._id,
                body: chat,
            }
            apis.sendMessage(messagePacket, conversationId)
                .then(async (res) => {
                    if (res.data.status) {
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
                !display
                    ?
                    <>
                        <p className={"ChatTab-noTabOpen"}>Click on a chat to start chatting</p>
                    </>
                    :
                    <div style={{display: !display && "none"}} className="Chat flex flex-col">
                        <TopNav user={chatUser} buttons={buttons}/>
                        <Messages receiver={chatUser._id}
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