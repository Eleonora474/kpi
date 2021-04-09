const { Router } = require('express')
const config = require('config')
const Table = require('../models/table')
const auth = require('../middleware/auth.middleware')
const router = Router()
// /api/table/generate
router.post('/create', auth, async (req, res) => {
  try {
    const {
      serialNumber,
      operation,
      division,
      coefficient,
      currentValue,
      recalculation,
    } = req.body

    const existing = await Table.findOne({ serialNumber })

    if (existing) {
      return res.status(401).json({message: 'Серийный номер занят'})
    }

    const table = new Table({
      serialNumber,
      operation,
      division,
      coefficient,
      currentValue,
      recalculation,
      owner: req.employeId,
    })

    await table.save()

    res.status(201).json(table )
  } catch (e) {
    console.log(e)
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
