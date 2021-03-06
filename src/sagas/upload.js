import { call, put } from "redux-saga/effects";
import * as uploadActions from "../actions/upload";
import { SERVER_URL, getAxiosInstance } from "../configuration/common";

export function* upload_process(action) {
    try {
        const payload = yield call(
            postuploadToAPI,
            action.fields
        );
        yield put(uploadActions.uploadSuccess(payload));
    } catch (e) {
        yield put(
            uploadActions.uploadFailure({
                "type": "error",
                "text": "Network Error!"
            })
        );
    }
}

const postuploadToAPI = data => {
    let instance = getAxiosInstance()
    return instance.post(`${SERVER_URL}/documents/build-document`, data);
};
