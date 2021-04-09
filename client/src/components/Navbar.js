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
    <nav>
      <div
        className="nav-wrapper green white-text"
        style={{ padding: '0 1rem' }}
      >
        <span className="brand-logo left">
          Ключевые показатели эффективности
        </span>
        <ul className="right">
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
  )
}
