const conn = require('../database/connection');
const jwt = require('jsonwebtoken');


const checkSession = (req, res, next) => {
    try {
    const token = req.cookies.wcid;
    if (!token) {
        res.status(404).send({"msg":"Invalid Session!!!"});
    }else {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        var getUserDataSql = `SELECT * FROM users WHERE id = "${verifyToken}"`;
        conn.query(getUserDataSql,(err, data)=>{
            if (err) return req.userData = "Error!!";

            const userData = {
                "name":data[0].user_name,
                "id" : data[0].id,
                "user_email" : data[0].user_email,
                "dept" : data[0].dept
            }

            req.token = token;
            req.userData= userData ;
            next();

        })
    }   

    } catch (error) {
     console.log(error);
     res.status(404).send({"msg":"Page Not Found!!!"})
    }
}

module.exports = checkSession;