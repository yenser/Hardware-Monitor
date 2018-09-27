import * as actionTypes from './actionTypes';

export const updateHardwareData = (data) => {
    return {
        type: actionTypes.UPDATE_DATA,
        data: data
    }
}