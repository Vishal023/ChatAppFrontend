import React from 'react';
import {Backdrop, CircularProgress} from "@material-ui/core";

const Loader = () => {
    return (
        <Backdrop open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default Loader;