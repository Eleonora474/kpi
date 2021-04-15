import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'

const intitalFormData = {
  serialNumber: '',
  operation: '',
  division: '',
  coefficient: '',
  currentValue: '',
  recalculation: '',
}
const today =
  new Date().getFullYear() +
  '-' +
  (new Date().getMonth() + 1).toString().padStart(2, 0) +
  '-' +
  new Date().getDate().toString().padStart(2, 0)
export const CreatePage = () => {
  const [date, setDate] = useState(today)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { loading, request } = useHttp()
  const [tableData, setTableData] = useState([])
  const [form, setForm] = useState(intitalFormData)
  const {
    serialNumber,
    operation,
    division,
    coefficient,
    currentValue,
    recalculation,
  } = form
  function onInputChange(e) {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }))
  }
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  async function onCreate() {
    const res = await request('/api/table/create', 'POST', form, {
      auth: localStorage.getItem('token'),
    })
    setTableData((prev) => [...prev, res])
    setForm(intitalFormData)
    closeModal()
  }

  useEffect(() => {
    async function getTableData() {
      const res = await request('/api/table/', 'GET', null, {
        auth: localStorage.getItem('token'),
      })
      setTableData(res)
    }
    getTableData()
  }, [])

  return (
    <div className="wrapper">
      <div className="sidebar ">
        <div>
          <input
            className="calendar"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
        <button className="submit btn" onClick={openModal}>
          <strong>Добавить</strong>
        </button>
      </div>
      <div className="content">
        {loading && <h5>Загрузка, пожалуйста подождите..</h5>}
        <table className="table" align="center">
          <thead>
            <tr>
              <th colspan="2">Операция</th>
              <th>Коэффицент</th>
              <th align="center">Текущее значение</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((d) => (
              <tr key={d._id}>
                <td>{d.operation}</td>
                <td>{d.division}</td>
                <td>{d.coefficient}</td>
                <td>{d.currentValue}</td>
                <td>{d.recalculation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          className="modal"
          onClick={closeModal}
          style={{ display: isModalOpen ? 'block' : 'none' }}
        >
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="modal-header">
              <h3>Добавить данные</h3>
            </div>
            <div className="modal-body">
              <input
                className="green-input"
                type="text"
                value={serialNumber}
                name="serialNumber"
                placeholder="Серийный номер"
                onChange={onInputChange}
              />
              <input
                className="green-input"
                type="text"
                value={operation}
                name="operation"
                placeholder="Наименование операции"
                onChange={onInputChange}
              />
              <input
                className="green-input"
                type="text"
                value={division}
                name="division"
                placeholder="Подразделение операции"
                onChange={onInputChange}
              />
              <input
                className="green-input"
                type="text"
                value={coefficient}
                name="coefficient"
                placeholder="Коэффицент"
                onChange={onInputChange}
              />
              <input
                className="green-input"
                type="text"
                value={currentValue}
                name="currentValue"
                placeholder="Текущее значение"
                onChange={onInputChange}
              />
              <input
                className="green-input"
                type="text"
                value={recalculation}
                name="recalculation"
                placeholder="Результат"
                onChange={onInputChange}
              />
              <button className="btn create" onClick={onCreate}>
                Создать
              </button>
              <button className="btn cancel" onClick={closeModal}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
