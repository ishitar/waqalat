import { call, put } from "redux-saga/effects";
import axios from "axios";

import * as signupActions from "../actions/signUp";

export function* signup_process(action) {
    try {
        const payload = yield call(
            postSignupToAPI,
            action.user
        );
        yield put(signupActions.signInSuccess(payload));
    } catch (e) {
        yield put(
            signupActions.signInFailure({
                "type": "error",
                "text": "Network Error!"
            })
        );
    }
}

const postSignupToAPI = data => {
    let instance = axios.create({
        headers: { "Content-Type": "application/json" }
    });
    return instance.post("https://cd8a68fef241.ngrok.io/user-management/users", data);
};
