export const initialState = {
    user: null,
    chatUser: null,
    userDisplay: false,
};

export const chatAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        case "SET_CHAT_USER":
            return {
                ...state,
                chatUser: action.payload
            }
        case "SET_DISPLAY_USER":
            return {
                ...state,
                userDisplay: !state.userDisplay
            }
        default:
            return state;
    }
};

export default chatAppReducer;