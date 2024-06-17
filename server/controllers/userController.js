const { model } = require('../db')
const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const ApiErrors = require('../error/ApiErrors')
const User = require('../models/userModel')
const { json } = require('sequelize')
const { use } = require('passport')
const userDto = require('../dtos/userDto')

class UserController {
    async reqistration(req, res, _next) {
        try {
            const {error} = userDto.createUserSchema.validate(req.body)
            if (error) {
                return ApiErrors.badRequest(error.details[0].message)
            }

            const {email, password, role} = req.body
            const candidate = await User.findOne({where: {email}})
            if(candidate) return ApiErrors.badRequest("User with this email already exists")

            const hashPassword = await bcrypt.hash(password, 7)

            const user = User.create({email, password: hashPassword, role})
            return res.json(user)
        } catch(e) {
            console.log(e)
        }
    }

    async login(req, res, _next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) return ApiErrors.notFound("missing email")

            const compareResult = await bcrypt.compare(password, user.password)

            if (compareResult) {
                const payload = {
                    email: user.email,
                    id: user.id
                }

                const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '30m'})
                const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: "7d"})

                return res.json({accessToken, refreshToken})
            } else {
                return ApiErrors.badRequest("Incorrect password")
            }
        } catch(e) {
            console.log(e)
        }
    }

    async logout(req, res, _next) {
        try {
            // Сервер не хранит информацию о токене, поэтому просто отправляем сообщение о выходе
            res.json({ message: "Successfully logged out" });
        } catch(e) {
            console.log(e)
        }
    }

    async refresh(req, res, _next) {
        try {
            const {refreshToken} = req.body

            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH)
            const user = await User.findByPk(decoded.id)
            if(!user) {
                return ApiErrors.notFound("User not found")
            }

            const accessToken = jwt.sign({email: user.email, id: user.id}, process.env.JWT_ACCESS, {expiresIn: '30m'})
            
            res.json({accessToken})
        } catch(e) {
            return ApiErrors.unauthorized("Invalid or expired refresh tokenx")
        }
    }

    async getUser(req, res, _next) {
        try {
            res.json(req.user)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()