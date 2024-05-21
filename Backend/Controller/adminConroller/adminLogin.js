const connection = require('../../Model/dbConnect');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    console.log(req.body)
    const sqlQuery = "SELECT * FROM admin WHERE email = ? and password = ?";
    await connection.query(sqlQuery, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.send({ Status: false, Error: "Query error", error: err.sqlMessage })
        else if (result.length > 0) {
            //    res.send(result)
            const email = result[0].email  //fetch email .. 
            const name = result[0].name
            //    res.send (email)  // for check email fetch ho rahi hai ya nhi 

            // jwt.sign() method se token genrate hoga
            const token = jwt.sign({ role: "admin", email: email, name: name }, "jwt_secret_key", { expiresIn: "1d" })
            //    res.send (token)

            // ab genrate token ko cookie me store kara lege. cookie keval frontend me dikhegi jo url cors me pass kiya hai ..
            res.cookie('token', token)
            return res.json({ loginStatus: true, Message:"Admin Login Successfully" })
        }
        else {  // jab result.length > 0  nhi ho tab 
            return res.json({ loginStatus: false, Error: "wrong email or password" })
        }
    })
}



///////==========  total admin count =================/////////////////
const totalAdmin = async (req, res) => {
    const sqlQuery = "SELECT COUNT(id) as totaladmin FROM admin";
    await connection.query(sqlQuery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}


module.exports = { adminLogin, totalAdmin }
