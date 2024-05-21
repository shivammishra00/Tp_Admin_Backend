const connection = require('../../Model/dbConnect');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

//////============  user Login  api =    ///////////////
const userLogin = (req, res) => {
    console.log(req.body)
    const sqlQuery = `SELECT * FROM tbl_admin_users WHERE email = ?`;
    connection.query(sqlQuery, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Status: false, Error: "Password Compare Error" })
                else if (response) {
                    const name = result[0].name;
                    const image = result[0].image

                    // uid isliye fetch kiya kyoki user_detaile me params me send karna h.
                    const uid = result[0].uid;  // token me uid isliye pass kiya kyoki start.jsx me bhi uid ki jarurat hogi params me send ke liye kyoki yaha se bhi userDetails component me use navigate karayege.

                    const token = jwt.sign({ role: 'user', name: name, image: image, uid: uid }, "jwt_secret_key", { expiresIn: '1d' })
                    // res.send(token)
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, Message: "User Login Successfully", uid })
                }
                else {
                    return res.json({ Status: false, Error: "Password Not Match" })
                }
            })
        }
        else {
            return res.json({ Status: false, Error: "No Email Existed" })
        }
    })
}


//////////////============ user LogOut api ===================///////////////////
const userLogout = (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
}

module.exports = { userLogin, userLogout }