import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config()

import { comparePassword } from "../encryption/password.js";

import db from "../database/createConnection.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authentication.js";

router.post('/users/authorized', authenticateToken, (req, res) => {
    res.sendStatus(200);
})

router.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    const userExists = await db.users.findOne({ username });

    if (userExists && await comparePassword(password, userExists.hashPassword)) {
        const accessToken = jwt.sign(userExists, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.setHeader('Set-Cookie', cookie.serialize('jwt', accessToken, {path: '/', httpOnly: true, secure: true, sameSite:"none"}));
        res.status(200).send("Success");
    }
    else {
        res.status(401).send("Incorrect login")
    }
})

router.post('/users/logout', (req, res) =>{
    res.clearCookie('jwt', { path: '/' })
    res.status(200).send("logged out")
})


export default router;