import React, {useEffect, useRef, useState} from 'react';
import apis from "../../api/api";

const Messages = ({conversationId, reload, sender, receiver, pusher}) => {
    const [messages, setMessages] = useState([]);


    const scrollHere = useRef();

    const fetchMessage = async () => {
        await apis.getMessage(conversationId)
            .then(r => {
                if (r.status) setMessages(r.data[0].messages);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchMessage().then(() => {
            scrollHere.current.scrollIntoView({behavior: 'smooth'});
        });
    }, [conversationId]);

    useEffect(() => {
        //Pusher.logToConsole = true;
        /*
        * FIXME
        *  Infinite loop is created
        * */
        let channel = pusher.subscribe('post-events_' + conversationId);
        channel.bind('postAction', async (data) => {
            const newMessage = await data.newMessage;
            setMessages(prevState => [...prevState, newMessage]);
            scrollHere.current.scrollIntoView({behavior: 'smooth'});
        })



        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

    }, [messages]);

    return (
        <div className="Chat-message flex flex-col">
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
    );
};

export default Messages;