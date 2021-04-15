import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreatePage } from './pages/CreatePages'
import { LoginPage } from './pages/LoginPages'
import { RegisterPage } from './pages/RegisterPages'

export const useRoutes = (isAuthenticated, isAdmin) => {
  if (isAuthenticated) {
    console.log(isAdmin)
    return (
      <Switch>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage isAdmin={isAdmin} />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
