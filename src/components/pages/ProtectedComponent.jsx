import React, {useEffect, useState} from 'react';
import apis from "../../api/api";
import {useDispatch} from "react-redux";
import {setUser} from "../../actions/action";
import Login from "./Login";
import Loader from "./Loader";

const ProtectedComponent = ({children}) => {
    const [auth, setAuth] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        apis.isLogged().then(r => {
            let {data} = r;
            if (r.status === 200 && data) setAuth(true);
            dispatch(setUser(data.user));
        }).catch(err => {
            setAuth(false);
            console.log(err)
        })
    });

    return (
        <>
            {
                auth === undefined ? <Loader/> : (!auth ? <Login/> : children)
            }
        </>
    );
};

export default ProtectedComponent;