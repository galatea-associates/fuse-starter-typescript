import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { rootStore } from './store/rootStore'
import { Provider } from 'react-redux'

const root = (
  <Provider store={rootStore}>
    <App />
  </Provider>

)

render(root, document.getElementById('root'))
