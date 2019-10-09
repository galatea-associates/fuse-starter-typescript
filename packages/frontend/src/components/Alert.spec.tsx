import React from 'react'
import { mount } from 'enzyme'
import { sleep } from '@fuse-starter-typescript/shared/sleep'
import { Alert, IAlert } from './Alert'
import uuid = require('uuid')

let successAlert: IAlert = {
  ok: true,
  status: 'All good',
  uuid: uuid.v4()
}

let failureAlert: IAlert = {
  ok: false,
  status: 'Something went wrong',
  uuid: uuid.v4()
}

let dismissAlertMockFn = jest.fn()

describe('Alert', () => {
  it('Renders a successful alert and then automatically dismisses it', async () => {
    // user -1 as the timeout to call dismissAlert immediately after rendering
    mount(
      <Alert alert={successAlert} dismissAlert={dismissAlertMockFn} timeout={-1}/>
    )

    expect(dismissAlertMockFn).toBeCalledTimes(1)
  })

  it('Renders a failure alert and does not dismiss it', async () => {

    mount(
      <Alert alert={failureAlert} dismissAlert={dismissAlertMockFn} />
    )

    expect(dismissAlertMockFn).toBeCalledTimes(0)
  })
})