export const initialState = {
    user: null,
    chatUser: null
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
        default:
            return state;
    }
};

export default chatAppReducer;