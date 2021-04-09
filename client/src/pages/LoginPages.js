import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const LoginPage = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    tabNumber: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.isAdmin)
      message(data.message)
      if (data.token) {
        console.log('ldkfff')
        history.push('/create')
      }
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 align="center">Ключевые показатели эффективности</h1>
        <div className="card white">
          <div className="card-content black-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите табельный номер"
                  value={form.tabNumber}
                  id="tabNumber"
                  type="text"
                  name="tabNumber"
                  className="green-input"
                  onChange={changeHandler}
                />
                <label htmlFor="tabNumber">Табельный номер</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn green"
              style={{ marginRight: 10, borderRadius: 20 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
