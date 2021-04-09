import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useHistory } from 'react-router-dom'

export const RegisterPage = ({ isAdmin }) => {
  const history = useHistory()
  if (!isAdmin) {
    history.push('/login')
  }
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    tabNumber: '',
    isAdmin: false,
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setForm({ ...form, [event.target.name]: value })
  }

  const register = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }
  console.log(form)
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 align="center">Ключевые показатели эффективности</h1>
        <div className="card white">
          <div className="card-content black-text">
            <span className="card-title">Регистрация</span>
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
              <div className="input-field">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      id="isAdmin"
                      checked={form.isAdmin}
                      name="isAdmin"
                      onChange={changeHandler}
                    />
                    <span>Администратор</span>
                  </label>
                </p>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn green"
              style={{ borderRadius: 20 }}
              onClick={register}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
