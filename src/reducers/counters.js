import ActionCount from '../actions/actionCount'

var initialState = {
    counter: 0,
    text: ""
}

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case ActionCount.INCREMENT:
            return {
                counter: state.counter + 1,
                text: action.text
            }
        case ActionCount.DECREMENT:
            return {
                counter: state.counter - 1,
                text: action.text
            }
        default:
            return state
    }
}

export default counterReducer;