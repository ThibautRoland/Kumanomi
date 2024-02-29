
import { RequestLogin } from "../interfaces/RequestLogin";
import sessionsRepo from "../repositories/sessions.repository";

// https://www.codecademy.com/resources/docs/typescript/promises
// promise + try catch to read the promise
function isExist(req: RequestLogin): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {

        try {   
            const value = await sessionsRepo.login(req.email, req.password);
            console.log(value.rows)

            resolve(value.rows[0].case === 'TRUE')
            
        } catch (error){
            reject(error)
        }
    });
}

module.exports = {
    isExist
};