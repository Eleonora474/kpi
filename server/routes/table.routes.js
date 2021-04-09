const { Router } = require('express')
const config = require('config')
const Table = require('../models/table')
const auth = require('../middleware/auth.middleware')
const router = Router()
// /api/table/generate
router.post('/generate', auth, async (req, res) => {
  try {
    const {
      serialNumber,
      operation,
      division,
      coefficient,
      currentValue,
      recalculation,
    } = req.body

    const existing = await Table.findOne({ from })

    if (e) {
      return res.json({ table: existing })
    }

    const table = new Table({
      serialNumber,
      operation,
      division,
      coefficient,
      currentValue,
      recalculation,s
      owner: req.employees.employeesId,
    })

    await table.save()

    res.status(201).json({ table })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.get('/', auth, async (req, res) => {
  try {
    const tables = await Table.find()
    res.json(tables)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
// router.get('/:id', auth, async (req, res) => {
//   try {
//   } catch (e) {
//     res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//   }
// })

module.exports = router
