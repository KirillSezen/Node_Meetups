const Router = require('express')
const meetupController = require('../controllers/meetupController')
const isOrganizer = require('../middleware/CheckRoleMiddleware')
const {validateByDtos} = require('../middleware/DtoValidationMiddleware')
const meetupDto = require('../dtos/meetupDto')
const passport = require('passport')

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Meetups
 *   description: API для управления митапами
 */

/**
 * @swagger
 * /meetups:
 *   get:
 *     summary: Получить все митапы
 *     tags: [Meetups]
 *     responses:
 *       200:
 *         description: Список всех митапов
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get(
    '/',
    validateByDtos(meetupDto.allMeetupsQuerySchema),
    meetupController.getAllMeetups
)

/**
 * @swagger
 * /meetups/{id}:
 *   get:
 *     summary: Получить информацию о конкретном митапе
 *     tags: [Meetups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID митапа
 *     responses:
 *       200:
 *         description: Информация о митапе
 *       404:
 *         description: Митап не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get(
    '/:id',
    meetupController.getCurrentMeetup
)

/**
 * @swagger
 * /meetups:
 *   post:
 *     summary: Создать новый митап
 *     tags: [Meetups]
 *     security:
 *       - jwt: []
 *     responses:
 *       201:
 *         description: Митап успешно создан
 *       400:
 *         description: Неверные данные митапа
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
    validateByDtos(meetupDto.createMeetupSchema),
    meetupController.createMeetup
)

/**
 * @swagger
 * /meetups/{id}:
 *   patch:
 *     summary: Обновить информацию о митапе
 *     tags: [Meetups]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID митапа
 *     responses:
 *       200:
 *         description: Информация о митапе успешно обновлена
 *       400:
 *         description: Неверные данные митапа
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Митап не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    isOrganizer,
    validateByDtos(meetupDto.updateMeetupSchema),
    meetupController.editMeetup
)

/**
 * @swagger
 * /meetups/{id}:
 *   delete:
 *     summary: Удалить митап
 *     tags: [Meetups]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID митапа
 *     responses:
 *       200:
 *         description: Митап успешно удален
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Митап не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    isOrganizer,
    meetupController.deleteMeetup
)

/**
 * @swagger
 * /meetups/{id}:
 *   post:
 *     summary: Зарегистрироваться на митап
 *     tags: [Meetups]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID митапа
 *     responses:
 *       201:
 *         description: Успешная регистрация на митап
 *       400:
 *         description: Неверные данные регистрации
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Митап не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    meetupController.signupToMeetup
)

module.exports = router 