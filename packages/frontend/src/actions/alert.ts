import { IAlert } from "../components/Alert"

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

export function addAlert(payload: IAlert): IAddAlertAction {
    return {
        type: ADD_ALERT,
        payload
    }
}

export function dismissAlert(index: number): IDismissAlert {
    return {
        type: DISMISS_ALERT,
        index
    }
}

export type AlertActionTypes = IAddAlertAction | IDismissAlert