/**
 * FIXME FOR OVERFLOW I AM CAUSING
 */
import React, {useEffect, useState} from 'react';
import '../scss/AddFriend.scss';
import {Avatar, Button, ButtonGroup, Popover, Snackbar, TextField} from "@material-ui/core";
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
        <Popover className={"AddFriend"} open={display}>
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
                        <Button key={index}
                                fullWidth
                                variant={"outlined"}
                                startIcon={<Avatar src={user.photos[0].value}> {user.displayName}</Avatar>}
                                endIcon={<Add/>}
                                onClick={() => {
                                    sendRequest(user._id)
                                }}
                                className={""}>
                            {user.displayName}
                        </Button>

                    ))
                }
            </div>
            <div className="Request-container flex flex-col flex-jc-c flex-ai-c">
                {
                    requests.length > 0
                    &&
                    <>
                        <h3>REQUESTS</h3>
                        <div className={"flex flex-wrap"}>
                            {
                                [...requests, ...requests, ...requests, ...requests, ...requests, ...requests, ...requests, ...requests, ...requests, ...requests, ...requests, ...requests].map((req, index) => (
                                    <ButtonGroup className={"flex-grow"} key={index} disableElevation
                                                 variant="outlined" color="primary">
                                        <Button>
                                            <Avatar src={req.photos[0].value}>
                                                {req.displayName}
                                            </Avatar>
                                        </Button>
                                        <Button className={"flex-grow"}
                                                color={"default"}>{req.displayName} </Button>
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
        </Popover>
    );
};

export default AddFriend;