const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const Employees = require('../models/employees')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    body('tabNumber', 'Введите табельный номер').exists(),
    body(
      'tabNumber',
      'Табельный номер должен содержать не менее 7 символов'
    ).isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }

      const { tabNumber, isAdmin } = req.body

      const candidate = await Employees.findOne({ tabNumber })

      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' })
      }

      const employee = new Employees({ isAdmin: !!isAdmin, tabNumber })

      await employee.save()

      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [body('tabNumber', 'Введите табельный номер').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        })
      }

      const { tabNumber } = req.body

      const employees = await Employees.findOne({ tabNumber })

      if (!employees) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const token = jwt.sign(
        { employeesId: employees.id },
        config.get('jwtSecret'),
        {
          expiresIn: '24h',
        }
      )

      res.json({
        token,
        isAdmin: employees.isAdmin,
        message: 'Добро пожаловать!',
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
