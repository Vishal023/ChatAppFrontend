import React, {useEffect, useState} from 'react';
import '../scss/AllChats.scss';
import {Avatar, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser, toggleDisplay} from "../../actions/action";
import apis from "../../api/api";

const AllChats = () => {
    const [users, setUser] = useState([]);

    const {user, chatUser} = useSelector(state => state.chatAppReducer);


    useEffect(() => {
        if (user) {
            apis.getAllFriends({friends: user.friends}).then(r => {
                setUser(r.data.users)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [user]);

    const dispatch = useDispatch();

    const setChatUser = (idx) => {
        dispatch(setCurrentUser(users[idx]));
        dispatch(toggleDisplay(true));
    };

    return (
        <div className={"AllChats flex flex-col flex-ai-c"}>
            {
                user && users.map((user, index) => (
                        <Button fullWidth
                                key={index}
                                onClick={() => {
                                    setChatUser(index)
                                }}
                                startIcon={<Avatar src={user.photos[0].value}> {user.displayName}</Avatar>}
                                className={`UserBox ${chatUser && chatUser._id === user._id ? "active" : ""}`}>
                            {user.displayName}
                        </Button>
                    )
                )
            }
        </div>
    );
}


export default AllChats;