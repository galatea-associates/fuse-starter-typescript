import { IAlert } from "../components/Alert"
import uuid = require("uuid");

export const ADD_ALERT = "ADD_ALERT"
export const DISMISS_ALERT = "DISMISS_ALERT"

interface IAddAlertAction {
    type: typeof ADD_ALERT
    payload: IAlert
}

interface IDismissAlert {
    type: typeof DISMISS_ALERT
    index: number
}

interface IAlertPayload {
    ok: boolean
    status: string
}

export function addAlert(payload: IAlertPayload): IAddAlertAction {
    return {
        type: ADD_ALERT,
        payload: {
            ok: payload.ok,
            status: payload.status,
            uuid: uuid.v4()
        }
    }
}

export function dismissAlert(index: number): IDismissAlert {
    return {
        type: DISMISS_ALERT,
        index
    }
}

export type AlertActionTypes = IAddAlertAction | IDismissAlert