export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
};

export const setCurrentUser = (user) => {
    return {
        type: "SET_CHAT_USER",
        payload: user
    }
};

export const toggleDisplay = () => {
    return {
        type: "SET_DISPLAY_USER"
    }
};