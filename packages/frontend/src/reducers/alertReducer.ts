import { IAlert } from "../components/Alert"
import { AlertActionTypes, ADD_ALERT, DISMISS_ALERT } from "../actions/alert"

 export interface IAlertState {
    alerts: IAlert[]
 }
export function alertReducer(
    state: IAlert[] = [{ok: false, status: "something went wrong"}, {ok: true, status: "something went right"}],
    action: AlertActionTypes){
        switch(action.type) {
            case ADD_ALERT:
                return  state.concat(action.payload)
            case DISMISS_ALERT:
                return state.filter((item, index) =>  index !== action.index)
            default:
                return state
        }
    }