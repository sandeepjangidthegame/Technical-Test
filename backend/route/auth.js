const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conn = require('../database/connection');
const route = express();
const checkSession = require('../middleware/checksession');

route.post('/register', async (req, res) => {
try {
    let id, create_date, status
    const {user_name, user_email, user_passwd, dept} = req.body;
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
                        if (err) return res.status(401).send({"msg":"Something Went Wrong!!"});
                        res.cookie("wcid", token, {
                            expires:new Date(Date.now() + 25892000000),
                            httpOnly : true
                        });
                        res.status(200).send({"msg":"Success"});
                    })
                    
                }else {
                    res.status(401).send({"":"Invalid Credentials!!!"})
                }

            }
        });

    } catch (error) {
        res.status(401).send({'msg':'Something Went Wrong!!!'})
        console.log(error);
    }
})

route.get('/cookies', checkSession, (req, res) => {
    res.status(200).json(req.userData);
})

route.get('/dashboard', checkSession, (req, res) => {
    res.status(200).json(req.userData);
})

route.get('/getallusers', (req, res) => {
    try {
        if (req.query.dept){
            let getDataSql = `SELECT * FROM users WHERE dept = "${req.query.dept}"`;
            conn.query(getDataSql,(err, data)=>{
                if (err) return res.status(304).send({"msg":"No Data Found!!!"});
                res.status(200).json(data[0]);
            })
        }else{
            let getDataSql = `SELECT * FROM users`;
            conn.query(getDataSql,(err, data)=>{
                if (err) return res.status(304).send({"msg":"No Data Found!!!"});
                res.status(200).json(data[0]);
            })
        }
    } catch (error) {
        res.status(401).send({"msg":"Something Went Wrong!!!"})
    }
})

module.exports = route;