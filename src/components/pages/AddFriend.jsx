import React, {useEffect, useState} from 'react';
import '../scss/AddFriend.scss';
import {Avatar, Button, ButtonGroup, Snackbar, TextField} from "@material-ui/core";
import apis from "../../api/api";
import {Add, Close, CloseSharp} from "@material-ui/icons";


const AddFriend = ({close, display, handleRequest, requests}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (text.length >= 4) {
            apis.getUser(text).then(res => {
                setAllUsers(res.data.users);
            }).catch(err => {
                console.log(err)
            })
        } else {
            setAllUsers([]);
        }
    }, [text]);

    const sendRequest = (id) => {
        const userId = {id: id};
        apis.addFriend(userId).then(r => {
            console.log(r)
            setOpen(true);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div style={{
            left: display ? "360px" : "100%",
            visibility: !display && "hidden"
        }} className={"AddFriend flex flex-col"}>
            <div className="AddFriend-search">
                <div className={"flex"}>
                    <TextField fullWidth label="Username"
                               value={text}
                               onChange={(e) => {
                                   setText(e.target.value)
                               }}
                               variant="outlined" placeholder={"Enter your friend's username/email"}/>
                    <Button onClick={() => {
                        close()
                    }} style={{color: "red"}}>
                        <CloseSharp/>
                    </Button>
                </div>
                {
                    allUsers && allUsers.map((user, index) => (
                        <ButtonGroup>
                            <Button key={index}
                                    disableRipple
                                    style={{justifyContent: "flex-start"}}
                                    startIcon={<Avatar src={user.photos[0].value}> {user.displayName}</Avatar>}
                                    endIcon={<Add/>}
                                    onClick={() => {
                                        sendRequest(user._id)
                                    }}
                                    className={"UserBox"}>
                                {user.displayName}
                            </Button>
                        </ButtonGroup>

                    ))
                }
            </div>
            <div className="Request-container flex flex-col flex-jc-c flex-ai-c flex-wrap ">
                {
                    requests.length > 0
                    &&
                    <>
                        <h3>REQUESTS</h3>
                        <div>
                            {
                                requests.map((req, index) => (
                                    <ButtonGroup key={index} disableElevation variant="outlined" color="primary">
                                        <Button>
                                            <Avatar src={req.photos[0].value}>
                                                {req.displayName}
                                            </Avatar>
                                        </Button>
                                        <Button color={"default"}>{req.displayName} </Button>
                                        <Button onClick={() => {
                                            handleRequest(req._id, 1)
                                        }} color={"primary"}>
                                            <Add/>
                                        </Button>
                                        <Button onClick={() => {
                                            handleRequest(req._id, 0)
                                        }} color={"secondary"}>
                                            <Close/>
                                        </Button>
                                    </ButtonGroup>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Request Sent"
            />
        </div>
    );
};

export default AddFriend;