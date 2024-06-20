const Router = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')
const {validateCreateUser} = require('../middleware/DtoValidationMiddleware')

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API для управления аутентификацией пользователей
 */

/**
 * @swagger  
 *   /api/registration:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Неверные данные пользователя
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post(
    '/registration',
    validateCreateUser,
    authController.reqistration
)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Пользователь успешно вошел
 *       401:
 *         description: Неверный логин или пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post(
    '/login',
    authController.login
)

/**
 * @swagger
 * /api/logout:
 *   delete:
 *     summary: Выход пользователя
 *     tags: [Authentication]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Пользователь успешно вышел
 *       401:
 *         description: Пользователь не аутентифицирован
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.delete(
    '/logout',
    passport.authenticate('jwt', {session: false}),
    authController.logout
)

/**
* @swagger
* /api/refresh:
*   post:
*     summary: Обновление токена
*     tags: [Authentication]
*     responses:
*       200:
*         description: Токен успешно обновлен
*       401:
*         description: Неверный или просроченный токен
*       500:
*         description: Внутренняя ошибка сервера
*/ 

router.post(
    '/refresh',
    authController.refresh
)

module.exports = router