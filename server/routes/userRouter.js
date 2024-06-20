const Router = require('express')
const passport = require('passport')
const userController = require('../controllers/userController')

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для управления пользователями
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Получить информацию о текущем пользователе
 *     tags: [Users]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Информация о текущем пользователе
 *       401:
 *         description: Не авторизован
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get(
    '/me',
    passport.authenticate('jwt', {session: false}),
    userController.getUser
)

module.exports = router