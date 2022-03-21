const jwt = require("jsonwebtoken");
require('dotenv').config()

const jwtTest = async () => {
    try {
        // simulate server response when user logged in
        // create jwt payload
        const payload = {
            name: 'you get the best of both worlds',
            id: 'qwertyuiop',
            email: 'email@domain.com'
        }
        // sign the jwt
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: (60 * 60) * 24}) // token is good for amt of time
        console.log(token);
        // decode the jwt -- make sure secret in jwt is same as server's secret
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};
jwtTest();