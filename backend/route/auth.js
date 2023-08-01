const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conn = require('../database/connection');
const route = express();
const checkSession = require('../middleware/checksession');

/**
 * @openapi 
 * '/register':
 *  post:
 *   tags:
 *    - Register
 *   summary: Register a User
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        required:
 *         - user_name
 *         - user_email
 *         - user_passwd
 *         - dept
 *        properties:
 *         user_name:
 *          type: string
 *          default: ajay
 *         user_email:
 *          type: string
 *          default: ajay@add.com
 *         user_passwd:
 *          type: string
 *          default: ajay
 *         dept:
 *          type: string
 *          default: Team
 *   responses:
 *    '200':
 *     description: Success
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string
 *    '401':
 *     description: Error
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string
 */

route.post('/register', async (req, res) => {
try {
    let id, create_date, status
    const {user_name, user_email, user_passwd, dept} = req.body;
    console.log(req.body);
    if (!validator.isEmail(user_email)) return res.status(401).send({"msg":"Invalid Email"});
    if (validator.isEmpty(user_name)) return res.status(401).send({"msg":"Invalid Name"});
    if (validator.isEmpty(user_passwd)) return res.status(401).send({"msg":"Invalid Password"});
    if (validator.isEmpty(dept)) return res.status(401).send({"msg":"Invalid Department"});

    await bcrypt.hash(user_passwd, 12, (err, hash) => {
        let hashPasswd = hash;
        const checkEmail = `SELECT * FROM users WHERE user_email = "${user_email}"`;
        conn.query(checkEmail, function(err, result, fields) {
            if (result.length > 0){
                res.status(401).send({"msg":"Email Already Exists!!!"})
            }else {
                
        id = Date.now();
        curDate = new Date();
        year = curDate.getFullYear().toString() ;
        month = curDate.getMonth()+1;
        date  = curDate.getDate();
    
        
    
        console.log(hashPasswd);
    
        create_date = year + "-" + month +"-"+ date;
        
        status=true;
    
        var regSql = `INSERT INTO users (id, user_name, user_email, user_passwd, dept, create_date, status) VALUES ("${id}", "${user_name}", "${user_email}", "${hashPasswd}", "${dept}", "${create_date}", "${status}")`;
    
        console.log(regSql);
    
        conn.query(regSql, (err) => {
            if (err) throw err;
            console.log("Register Successful!");     
            res.status(200).json({ 'msg': "User registered successfully!" });
        })
    
            }
        }); 
    });

} catch (error) {
    res.status(401).send({'msg':'Something Went Wrong!!!'})
    console.log(error);
}
})


/**
 * @openapi 
 * '/login':
 *  post:
 *   tags:
 *    - login
 *   summary: login a User
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        required:
 *         - email
 *         - password
 *        properties:
 *         email:
 *          type: string
 *          default: ajay@add.com
 *         password:
 *          type: string
 *          default: 1234
 *   responses:
 *    '200':
 *     description: Success
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string
 *    '401':
 *     description: Error
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string
 */


route.post('/login', (req, res) => {
    try {
        const {email, password} = req.body;
        if (!validator.isEmail(email)) return res.status(401).send({"msg":"Invalid Email"});
        if (validator.isEmpty(password)) return res.status(401).send({"msg":"Invalid Password"});
        var logInSql = `SELECT * FROM users WHERE user_email = "${email}"`;

        conn.query(logInSql, async function(err, result){
            if (result.length > 0){
                const matchPasswd = await bcrypt.compare(password, result[0].user_passwd);
                if (matchPasswd){
                    let token = jwt.sign(result[0].id, process.env.SECRET_KEY);
                    var tokId = Date.now();
                    var userId = result[0].id;
                    let tokenSql = `INSERT INTO token (id, user_id, user_token, token_status) VALUES ("${tokId}","${userId}", "${token}", "true")`;
                    conn.query(tokenSql, (err) => {
                        if (err) return res.status(401).send({"msg":"Invalid Credentials!!"});
                        res.cookie("wcid", token, {
                            expires:new Date(Date.now() + 25892000000),
                            httpOnly : true
                        });
                        res.status(200).send({"msg":"Success"});
                    })
                    
                }else {
                    res.status(401).send({"msg":"Invalid Credentials!!!"})
                }

            }
        });

    } catch (error) {
        res.status(401).send({'msg':'Something Went Wrong!!!'})
        console.log(error);
    }
})

/** 
 * @openapi
 * '/cookies':
 *  get:
 *   tags:
 *    - cookies check
 *   summary: check User session
 *   security:
 *     type: apikey
 *     in: cookie
 *     name: wcid
 *   description: Check user token
 *   response:
 *    '200':
 *     description: Success
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: object
 *    '401':
 *     description: Error
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string 
 *    '404':
 *     description: Error
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string 
 * */ 

route.get('/cookies', checkSession, (req, res) => {
    res.status(200).json(req.userData);
})

route.get('/dashboard', checkSession, (req, res) => {
    res.status(200).json(req.userData);
})


/**
 * @openapi 
 * '/getallusers':
 *  get:
 *   tags:
 *    - Get All Users
 *   summary: All Users Info
 *   responses:
 *    '200':
 *     description: Success
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: object
 *    '401':
 *     description: Error
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string
 *    '304':
 *     description: Error
 *     content: 
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         msg:
 *          type: string
 */


route.get('/getallusers', (req, res) => {
    try {
        if (req.query.dept){
            let getDataSql = `SELECT * FROM users WHERE dept = "${req.query.dept}"`;
            conn.query(getDataSql,(err, data)=>{
                if (err) return res.status(304).send({"msg":"No Data Found!!!"});
                if (data.length > 0){
                res.status(200).json(data);
            }else {res.status(200).send({"msg":"No User Found"});}
            })
        }else{
            let getDataSql = `SELECT * FROM users`;
            conn.query(getDataSql,(err, data)=>{
                if (err) return res.status(304).send({"msg":"No Data Found!!!"});
                res.status(200).json(data);
            })
        }
    } catch (error) {
        res.status(401).send({"msg":"Something Went Wrong!!!"})
    }
})

module.exports = route;