

type ResponseUserAndPasswordExist = {
    exist: boolean
}
function isExist(): Promise<ResponseUserAndPasswordExist> {
    return new Promise((resolve, reject) => {
        const res = {exist : true} as ResponseUserAndPasswordExist
        resolve(res)
        /*doctorLogic.getAllDoctors((error, doctors) => {
            if (error) {
                reject(error);
            } else {
                resolve(doctors);
            }
        });*/
    });
}

module.exports = {
    isExist
};