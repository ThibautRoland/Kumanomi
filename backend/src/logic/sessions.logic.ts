
import { RequestLogin } from "../interfaces/RequestLogin";
import sessionsRepo from "../repositories/sessions.repository";
import jwt from 'jsonwebtoken';

// https://www.codecademy.com/resources/docs/typescript/promises
// promise + try catch to read the promise
function isExist(req: RequestLogin): Promise<String> {
    return new Promise(async (resolve, reject) => {

        try {   
            const value = await sessionsRepo.login(req.email, req.password);
            console.log(value.rows)
            
            const userExist = value.rows[0].case === 'TRUE'
            if (!userExist) {
                resolve("")
            }
            const newAuthToken =  createJwtToken(req.email)
            resolve(newAuthToken)
            
        } catch (error){
            reject(error)
        }
    });
}

const SECRET_KEY_JWT = 'KUMANOMI_JWT_KEY_ENCRYPTION_UN_PEU_COMME_CE_QUON_A_FAIT_POUR_POSTGRES_UNE_SORTE_DE_CLEF_RANDOME_QUON_VA_STOCKER_EN_VARIABLE_DENV_CA_VA_ZINC_SINON'

function createJwtToken(email : string){
    return jwt.sign({ email: email}, SECRET_KEY_JWT);
}

module.exports = {
    isExist
};