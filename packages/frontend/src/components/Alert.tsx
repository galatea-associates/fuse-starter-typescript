import {useEffect, useLayoutEffect, useState} from "react";
import React from "react";

export interface IAlert {
    status: string
    ok: boolean
}

interface Props {
    alert: IAlert,
    dismissAlert(): void,
    timeout?: number
}
function getAlertCssClass(alert: IAlert) {
    let baseClasses = 'alert alert-dismissible fade m-4 p-0 show '
    if (alert.ok) {
        return baseClasses + 'alert-success'
    }
    else {
        return baseClasses + 'alert-danger'
    }
}
export function Alert(props: Props) {
    let totalTime = props.timeout ? props.timeout : 5000
    let [timeLeft, setTimeLeft] = useState(totalTime)
    let percentRemaining = Math.round((timeLeft / totalTime) * 100);

    // make interval global-ish so that onClick can use it
    let interval: any
    useEffect(() => {

        if (props.alert.ok && timeLeft > 0) {
            interval = setInterval(
                () => setTimeLeft(timeLeft - 1000),
                1000)

        }
        else if (props.alert.ok && timeLeft <= 0) {
            clearInterval(interval)
            props.dismissAlert()
        }
        return function clear() {

            clearInterval(interval)
        }
    })
    return (
        <div className={getAlertCssClass(props.alert)}>
            <div style={{"padding": ".75rem 1.25rem"}}>
                {props.alert.status}
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    // need to use () => syntax to avoid
                    // double alerts being closed
                    // also need ot clear the interval
                    onClick={() => {
                        clearInterval(interval)
                        props.dismissAlert()
                    }}
                ><span aria-hidden="true">&times;</span>
                </button>
            </div>

            {props.alert.ok ?
                <div
                    className="progress"
                    style={{ "height": "2px" }}
                >
                    <div
                        className="progress-bar bg-success"
                        role='progressbar'
                        style={{ "width": `${percentRemaining}%` }}
                        aria-valuenow={percentRemaining}
                        aria-valuemin={0}
                        aria-valuemax={100}                >
                    </div>
                </div>
                : ""
            }

        </div>
    )
}