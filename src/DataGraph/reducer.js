import * as actionTypes from './actionTypes';

const initialState = {
    memHistory: Array(60).fill(NaN)
};

function getSizeInGigaByte(a) {
    var c = 1024;
    var f = Math.floor(Math.log(a)/Math.log(c));
    return parseFloat((a/Math.pow(c,f)).toFixed(2))
}

const updateData = (state, action) => {
    var stateClone = state;
    stateClone.memHistory.shift();
    stateClone.memHistory.push(getSizeInGigaByte(action.data.usedmem));
    stateClone.usedmem = action.data.usedmem;
    stateClone.totalmem = action.data.totalmem;

    return {...stateClone};
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_DATA: return updateData(state, action);
        default:
            return state;
    }
}

export default reducer;