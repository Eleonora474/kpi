import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  console.log(auth)
  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <>
      <nav className="nav-wrapper green white-text" style={{ height: '100%' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2em', textAlign: 'center' }}>
            Ключевые показатели эффективности
          </h1>
        </div>

        <div>
          <ul style={{ display: 'flex', justifyContent: 'center' }}>
            {auth.isAdmin && (
              <li>
                <NavLink to="/register">Создать пользователя</NavLink>
              </li>
            )}
            <li className="active">
              <NavLink to="/create">Главная</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
