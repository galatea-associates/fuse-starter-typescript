import React from 'react'
import {mount} from "enzyme";
import {Home} from "./Home";
import {createMockStore, mockStore, rootState} from "./__tests__/fixtures";
import {Provider} from "react-redux";
import fetchMock = require('fetch-mock')
import {IUser} from "@fuse-starter-typescript/shared/interfaces/IUser";
import {sleep} from "@fuse-starter-typescript/shared/sleep";


describe('Home', () => {
    it('can be shallow rendered', async () => {
        let mockUser: IUser = {
            firstName: "testFirst",
            lastName: "testLast"
        }
        fetchMock.mock('/api/test', {status: 200, body: mockUser})
        mount(
            <Provider store={mockStore}>
                <Home/>
            </Provider>
        )
        sleep(500);
        expect(mockStore.getActions().length).toEqual(1)
    })
})