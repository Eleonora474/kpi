import React, { useState } from 'react'

const today =
  new Date().getFullYear() +
  '-' +
  (new Date().getMonth() + 1).toString().padStart(2, 0) +
  '-' +
  new Date().getDate().toString().padStart(2, 0)
export const CreatePage = () => {
  const [date, setDate] = useState(today)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { loading, request, error, clearError } = useHttp()
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    async function getTableData() {
      const res = request('/api/table/', 'GET'),
        {}
    }
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
          <select>
            <option>За День</option>
            <option>За Неделю</option>
            <option>За Месяц</option>
          </select>
          <br />
        </div>
        <button className="submit btn" onClick={openModal}>
          <strong>Добавить</strong>
        </button>
      </div>
      <div className="content">
        <table className="table" align="center">
          <tr>
            <th>№</th>
            <th colspan="2">Основные продукты</th>
            <th>Коэффицент перерасчета</th>
            <th>Текущее значение</th>
            <th>Перерасчет</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="four"></td>
            <td></td>
          </tr>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
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
                className="input"
                type="text"
                // onChange={(e) => setNewOperationName(e.target.value)}
                // value={newOperationName}
              />
              <button className="btn create">
                {/* onClick={saveOperation} */}
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
