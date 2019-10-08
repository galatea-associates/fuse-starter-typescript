import { useSelector, useDispatch } from "react-redux";
import { Alert, IAlert } from "./Alert";
import React from "react";
import { RootState } from "../reducers/rootReducer";
import { dismissAlert } from "../actions/alert";

export function AlertContainer() {
    const alerts = useSelector((state: RootState) => state.alerts)
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            {
                alerts.map(
                    (alert: IAlert, index: number) =>
                        <Alert
                            key={alert.uuid}
                            alert={alert}
                            dismissAlert={() => dispatch(dismissAlert(index))} />
                )
            }
        </React.Fragment>
    )
}