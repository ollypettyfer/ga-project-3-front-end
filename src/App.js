import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import { isLoggedIn } from './lib/auth'

import Home from './pages/Home'
import CountriesIndex from './pages/CountriesIndex.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Logout from './pages/Logout'
import MembersDashboard from './pages/MembersDashboard.js'
import SearchResults from './pages/SearchResults'
import EditDelete from './pages/EditDelete'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (isLoggedIn()) {
      setIsAuthenticated(true)
    }
  })

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/countries/:id" component={SearchResults} />
        <Route exact path="/countries" component={CountriesIndex} />
        <Route exact path="/register" component={Register} />

        <Route
          exact
          path="/login"
          component={() => <Login callback={() => setIsAuthenticated(true)} />}
        />
        <Route
          exact
          path="/logout"
          component={() => (
            <Logout callback={() => setIsAuthenticated(false)} />
          )}
        />
        <Route exact path="/members" component={MembersDashboard} />
        <Route exact path="/editdelete/:id" component={EditDelete} />
        <Route exact path="/editdelete/" component={MembersDashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
