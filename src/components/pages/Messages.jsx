import React, {useEffect, useRef, useState} from 'react';
import apis from "../../api/api";
import '../scss/Messages.scss';

const Messages = ({conversationId, reload, sender, receiver, newMessage}) => {
    const [messages, setMessages] = useState([]);

    const scrollHere = useRef();
    const messageContainerRef = useRef();

    useEffect(() => {
        (async () => {
            await setMessages(prevState => [...prevState, newMessage]);
            scrollHere.current.scrollIntoView({behavior: 'smooth'});
        })();
    }, [newMessage]);


    useEffect(() => {
        const fetchConversation = async () =>{
            await apis.getMessage(conversationId)
            .then(r => {
                if (r.status) setMessages(r.data[0].messages);
            })
            .catch(err => console.log(err));
        }
        fetchConversation().then(()=>{
            const stickBottom = messageContainerRef.current;
            stickBottom.scrollTop = stickBottom.scrollHeight - stickBottom.clientHeight;
        });
    }, [conversationId]);

    return (
        <div className="Messages">
            <div ref={messageContainerRef} className="Messages-container flex flex-col">
                {
                    messages.length > 0 &&
                    messages.map((message, index) => (
                        <p key={index} className={message.id_sender === sender ? "Message sender" : "Message receiver"}>
                            {
                                message.body
                            }
                        </p>
                    ))
                }
                <div ref={scrollHere}/>
            </div>
        </div>

    );
};

export default Messages;