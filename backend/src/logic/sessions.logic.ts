
import { RequestLogin } from "../models/types/RequestLogin";
import sessionsRepo from "../repositories/sessions.repository";
import jwt from 'jsonwebtoken';

type userAuth = {
    token: string,
    id: number,
    profilImg: string
}

const secretKeyJwt = process.env.SECRET_KEY_JWT

// https://www.codecademy.com/resources/docs/typescript/promises
// promise + try catch to read the promise
function isExist(req: RequestLogin): Promise<userAuth> {
    return new Promise(async (resolve, reject) => {

        try {
            const value = await sessionsRepo.login(req.email, req.password);
            console.log(value.rows)
            if (value.rows.length<1) {
                resolve({
                    token: "",
                    id: -1,
                    profilImg: ""
                })
            }
            const res = value.rows[0]
            const newAuthToken =  createJwtToken(req.email, res.id)
            resolve({
                token: newAuthToken,
                id: res.id as number,
                profilImg: res.profil_img
            })

        } catch (error){
            reject(error)
        }
    });
}

function createJwtToken(email : string, id : number){
    return jwt.sign({ email: email, id : id}, secretKeyJwt);
}

module.exports = {
    isExist
};