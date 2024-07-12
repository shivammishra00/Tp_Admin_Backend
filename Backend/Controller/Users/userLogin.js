const connection = require('../../Model/dbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//////============  user Login  api =    ///////////////
const userLogin = async (req, res) => {
    console.log(req.body)

    // const sqlQuery = `SELECT * FROM tbl_admin_users WHERE email = ?`;

    // sub query bnaya user,roles,role assign table se //
    const sqlQuery = `SELECT  u.*,  r.rolename FROM tbl_admin_users u LEFT JOIN tbl_admin_role_assign ra ON u.uid = ra.uid LEFT JOIN  tbl_admin_roles r ON ra.roleid = r.roleid WHERE  u.email = ?`;

   await connection.query(sqlQuery, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        // else return res.json({Status:true, result})
        else if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Status: false, Error: "Password Compare Error" })
                else if (response) {
                    const name = result[0].name;
                    const image = result[0].image
                    const role = result[0].rolename

                    // uid isliye fetch kiya kyoki user_detaile me params me send karna h.
                    const uid = result[0].uid;  // token me uid isliye pass kiya kyoki start.jsx me bhi uid ki jarurat hogi params me send ke liye kyoki yaha se bhi userDetails component me use navigate karayege.

                    const token = jwt.sign({role: role, name: name, image: image, uid: uid }, "jwt_secret_key", { expiresIn: '1d' })
                    // res.send(token)
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, Message: "User Login Successfully", uid, result })
                    // jaise jab user ko login karvate hai to yadi yaha se role vagaira nhi bhejege to frontend se kaise redirect karvayege ki kis page me redirect karvana hai ..
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