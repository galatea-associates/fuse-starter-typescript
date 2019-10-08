import {RootState} from "../reducers/rootReducer";
import configureStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk'

export const rootState: RootState = {
    alerts: [],
    userState: {
        isFetching: true
    }
}

export const mockStoreConfiguration = configureStore([thunk])

export function createMockStore(state: RootState): MockStore {
    return mockStoreConfiguration(state)
}

export const mockStore = createMockStore(rootState)