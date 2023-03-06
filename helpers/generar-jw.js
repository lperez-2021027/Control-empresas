const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_KEY_FOR_TOKEN, {
            expiresIn: '5h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error al intentar generar token')
            } else {
                resolve(token);
            }
        });

    }); 
    
}

module.exports = {
    generarJWT
}