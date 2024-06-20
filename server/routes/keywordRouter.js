const Router = require('express')
const keywordController = require('../controllers/keywordController')
const isOrganizer = require('../middleware/CheckRoleMiddleware')
const {validateCreateKeyword, validateUpdateKeyword} = require('../middleware/DtoValidationMiddleware')
const passport = require('passport')

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Keywords
 *   description: API для управления ключевыми словами
 */

/**
 * @swagger
 * /keywords:
 *   get:
 *     summary: Получить все ключевые слова
 *     tags: [Keywords]
 *     responses:
 *       200:
 *         description: Список ключевых слов
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get(
    '/',
    keywordController.getAllKeyWords
)

/**
 * @swagger
 * /keywords:
 *   post:
 *     summary: Создать новое ключевое слово
 *     tags: [Keywords]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Ключевое слово успешно создано
 *       400:
 *         description: Неверные данные ключевого слова
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    isOrganizer,
    validateCreateKeyword,
    keywordController.createKeyWord
)

/**
 * @swagger
 * /keywords/{id}:
 *   patch:
 *     summary: Обновить ключевое слово
 *     tags: [Keywords]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID ключевого слова
 *     responses:
 *       200:
 *         description: Ключевое слово успешно обновлено
 *       400:
 *         description: Неверные данные ключевого слова
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Ключевое слово не найдено
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    isOrganizer,
    validateUpdateKeyword,
    keywordController.editKeyWord
)

/**
 * @swagger
 * /keywords/{id}:
 *   delete:
 *     summary: Удалить ключевое слово
 *     tags: [Keywords]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID ключевого слова
 *     responses:
 *       200:
 *         description: Ключевое слово успешно удалено
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Ключевое слово не найдено
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    isOrganizer,
    keywordController.deleteKeyWord
)

/**
 * @swagger
 * /keywords/{id}:
 *   post:
 *     summary: Добавить ключевое слово к митапу
 *     tags: [Keywords]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID ключевого слова
 *     responses:
 *       201:
 *         description: Ключевое слово успешно добавлено
 *       400:
 *         description: Неверные данные ключевого слова
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Ключевое слово не найдено
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    isOrganizer,
    keywordController.addKeyWord
)

module.exports = router