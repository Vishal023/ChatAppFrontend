import axios from "./axios";

export const isLogged = async () => await axios.get("/user/isLogged", {withCredentials: true});
export const getUser = async (query) => await axios.get("/user/find/" + query);
export const addFriend = async (id) => await axios.post("/user/sendRequest", id, {withCredentials: true});
export const getRequestUser = async (requests) => await axios.post("/user/fetchRequests", requests, {withCredentials: true});
export const confirmReq = async (request) => await axios.post("/user/respondRequest", request, {withCredentials: true});
export const getAllFriends = async (friends) => await axios.post("/user/fetch/friends", friends, {withCredentials: true});
export const sendMessage = async (messagePacket, conversationId) => await axios.post("/messages/" + conversationId, messagePacket, {withCredentials: true});
export const getMessage = async (conversationId) => await axios.get("/messages/" + conversationId, {withCredentials: true});

const apis = {
    isLogged,
    getUser,
    addFriend,
    getRequestUser,
    confirmReq,
    getAllFriends,
    sendMessage,
    getMessage
};

export default apis;