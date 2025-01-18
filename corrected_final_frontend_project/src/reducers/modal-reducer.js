import { OPEN_MODAL } from "../actions/open-modal"
import { CLOSE_MODAL } from "../actions/close-modal"

const initialState = {
    modal: {
        isOpen: false,
    }
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isOpen: true,
                }
            }
        case CLOSE_MODAL:
            return initialState
        default:
            return state;
    }
}

export default modalReducer


