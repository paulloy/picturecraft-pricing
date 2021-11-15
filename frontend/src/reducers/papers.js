import { GET_PAPERS } from "../actions/types";

const initialState = {
    papers: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PAPERS:
            return {
                ...state,
                papers: action.payload
            }
        default:
            return state;
    }
}