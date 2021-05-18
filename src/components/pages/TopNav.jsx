import React from 'react';
import {Avatar, IconButton} from "@material-ui/core";
import '../scss/TopNav.scss';

const TopNav = ({user, buttons}) => {
    return (
        <div className={"TopNav flex flex-jc-sb flex-ai-c"}>
            <IconButton style={{backgroundColor: "transparent", color: "#F2F2F2"}} disableRipple size={"medium"}>
                <Avatar src={user && user.photos[0].value}>{user && user.displayName}</Avatar>
            </IconButton>
            <nav className="TopNav-option flex flex-grow flex-jc-fe">
                {
                    buttons.map(button => button)
                }
            </nav>
        </div>
    );
};

export default TopNav;