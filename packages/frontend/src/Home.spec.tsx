import React from 'react'
import {mount} from "enzyme";
import {Home} from "./Home";
import {mockStore} from "./__tests__/fixtures";
import {Provider} from "react-redux";
import {IUser} from "@fuse-starter-typescript/shared/interfaces/IUser";
import {sleep} from "@fuse-starter-typescript/shared/sleep";
import fetchMock = require('fetch-mock');


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
        // give the store a bit of time to receive the action and put it in the store
        await sleep(500);
        expect(mockStore.getActions().length).toEqual(1)
    })
})