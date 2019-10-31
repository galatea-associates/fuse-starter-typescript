import React from 'react'
import { mount } from 'enzyme'
import { Home } from './Home'
import { mockStore } from './__tests__/fixtures'
import { Provider } from 'react-redux'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { sleep } from '@fuse-starter-typescript/shared/sleep'
import fetchMock = require('fetch-mock')

describe('Home', () => {
  it('Can renders a user when the backend is working', async () => {
    const mockUser: IUser = {
      firstName: 'testFirst',
      lastName: 'testLast'
    }
    fetchMock.reset()
    fetchMock.mock('/api/test', { status: 200, body: mockUser })
    mount(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    )
    // give the store a bit of time to receive the action and put it in the store
    await sleep(500)

    // now we should have three actions in the store. 1. set_user_fetching, 2. add_alert
    // 3. set_user_fetching
    expect(mockStore.getActions().length).toEqual(3)
  })

  it('Can renders an alert when something goes wrong', async () => {
    fetchMock.reset()
    fetchMock.mock('/api/test', { status: 500 })

    // clear the actions at the beginning of the test
    mockStore.clearActions()

    mount(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    )
    // give the store a bit of time to receive the action and put it in the store
    await sleep(500)

    // now we should have three actions in the store. 1. set_user_fetching, 2. add_alert
    // 3. set_user_fetching
    expect(mockStore.getActions().length).toEqual(3)
  })
})
