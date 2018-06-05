import axios from 'axios';

import * as actionTypes from './actionTypes';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA8nztMdEUv9gVsk1qKqoUlOIEE47eJmWk';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA8nztMdEUv9gVsk1qKqoUlOIEE47eJmWk';
        }

        axios.post(
            url,
            authData
        ).then(response => {
            console.log(response);

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);

            const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem('expirationDate')
            );

            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(authTimeout(
                    (expirationDate.getTime()-new Date().getTime())/1000
                ));
            } else {

            }
        }
    };
};