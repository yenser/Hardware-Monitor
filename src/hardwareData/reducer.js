import * as actionTypes from './actionTypes';
import { deepClone } from '../utils';

const initialState = {
    ram: {
        memHistory: Array(60).fill(NaN)
    }
};

function getSizeInGigaByte(a) {
    var c = 1024;
    var f = Math.floor(Math.log(a)/Math.log(c));
    return parseFloat((a/Math.pow(c,f)).toFixed(2))
}

const updateData = (state, action) => {
    var stateClone = deepClone(state);

    stateClone.user = action.data.user;
    stateClone.system = action.data.system;
    stateClone.network = action.data.network;
    stateClone.cpu = action.data.cpu;

    stateClone.ram.memHistory.shift();
    stateClone.ram.memHistory.push(getSizeInGigaByte(action.data.ram.usedmem));
    stateClone.ram.usedmem = action.data.ram.usedmem;
    stateClone.ram.totalmem = action.data.ram.totalmem;

    console.log(stateClone);

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