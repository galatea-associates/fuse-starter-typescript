import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Home } from './Home'
import { AlertContainer } from './components/AlertContainer'
import { UserContainer } from './UserContainer'

export default function App () {
  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light r-auto bg-light'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a href='/'>Fuse Starter TypeScript</a>
            </li>
          </ul>
        </nav>
        <AlertContainer />
        <div className='container mt-2'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/user/:uuid' children={<UserContainer />} />
          </Switch>
        </div>
      </div>
    </Router>

  )
}
