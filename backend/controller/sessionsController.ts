const express = require('express');
const sessionsLogic = require('../logic/sessionsLogic');
const app = express();
import { Request, Response } from 'express';

// const login = async () => {
    
// }
type RequestLogin = {
    email: string,
    password: string
}

app.post('/', async (req: Request, res: Response) => {


    if (req.body === null ) {
        return res.status(422).json("body is null")
    }

    const body = req.body as RequestLogin;
    
    if (body.email === null || body.password === null) {
        return res.status(422).json("body is null")
    }

    try {
        const result = await sessionsLogic.isExist();
        return res.status(422).json(result)
        
    } catch (error) {
        return res.status(522).json("big error "+error)
    }
});

export default app;