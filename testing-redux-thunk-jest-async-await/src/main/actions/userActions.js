import axios from 'axios';
import { LoginType } from './ActionTypes';

export function loginButtonPressed(username, password) {
    return async (dispatch, getState) => {
        const url = 'https://endpoint.local';
        dispatch(authenticationPending());
        try {
            await axios.post(url,
                {
                    username,
                    password
                });
            dispatch(authenticationSuccess());
        } catch (error) {
            dispatch(authenticationFailed());
        }
    };
}

export function authenticationPending() {
    return {
        type: LoginType.AUTHENTICATION_PENDING
    };
}

export function authenticationSuccess() {
    return {
        type: LoginType.AUTHENTICATION_SUCCESS
    };
}
export function authenticationFailed() {
    return {
        type: LoginType.AUTHENTICATION_FAILED
    };
}