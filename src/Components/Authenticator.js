import React, { useEffect } from 'react'
import { createContext, useState } from 'react';
import axios from 'axios';
import { SERVER_HOST } from '../constants';
const LoggedInUserContext = createContext();
export default function Authenticator({ children }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userLoggedData, setUserLoggedData] = useState({});
    const [userCartData, setUserCartData] = useState([]);

    console.log("cartResult", userCartData);
    let authChecker = async () => {
        const atoken = sessionStorage.getItem("atoken");
        debugger
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaattttttttttd", atoken);
        if (atoken === "null") {
            debugger
            setLoggedIn(false)
            setUserLoggedData({});
            setUserCartData([])
        } else {
            try {
                const res = await axios.get(`${SERVER_HOST}/authenticator`, { headers: { "Authorization": `Bearer ${atoken}` } });
                debugger
                if (res.data.status) {
                    debugger;
                    setLoggedIn(true);
                    console.log('weqeqweqwe', res.data.userLoggedData)
                    setUserLoggedData(res.data.data.userLoggedData);
                    const userCartRef = res.data.data.userLoggedData.id;
                    //console.log("uuuurerrrrrrrrrrrffffffff",userCartRef);
                    const cartResult = await axios.get(`${SERVER_HOST}/usercartdata/${userCartRef}`, { headers: { "Authorization": `Bearer ${atoken}` } });
                    debugger;
                    setUserCartData(cartResult.data);
                } else {
                    setLoggedIn(false)
                    setUserLoggedData({});
                    setUserCartData([]);

                }
            }
            catch (e) {
                console.log(`Error :${e}`)
            }
        }

    };
    useEffect(() => {

        authChecker();


    }, [loggedIn, userCartData.length])


    return (
        <LoggedInUserContext.Provider value={{ loggedIn, setLoggedIn, userLoggedData, setUserLoggedData, authChecker, userCartData, setUserCartData }}>
            {children}
        </LoggedInUserContext.Provider>
    )
}
export { LoggedInUserContext }



