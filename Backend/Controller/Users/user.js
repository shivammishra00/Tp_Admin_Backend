const connection = require('../../Model/dbConnect');
const bcrypt = require('bcrypt');
const salt = 10;

const addUsers = (req, res) => {
    const sqlQuery = "INSERT INTO tbl_admin_users SET ?"
    // console.log(req.body)
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return console.log({ Status: false, Error: "error for hashing password" })
        const data = {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            contact: req.body.contact,
            image: req.file.location,
            aadhar: req.body.aadhar,
            doj: req.body.doj,
            dob: req.body.dob,
            qualification: req.body.qualification,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            address: req.body.address
        }
        console.log(data)  //  for chek password hash or not 
        connection.query(sqlQuery, [data], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
            else return res.json({ Status: true, Message: "user added successfully", result })
        })
    })
}

const getUsers = async (req, res) => {
    const sqlQuery = "SELECT * FROM tbl_admin_users";
    await connection.query(sqlQuery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const updateUsers = async (req, res) => {
    console.log(req.body)
    const sqlQuery = "UPDATE tbl_admin_users SET email=?, contact=?, qualification=? WHERE uid=?"
    // const {email, contact, qualification} = req.body
    const data = [
        req.body.email,
        req.body.contact,
        req.body.qualification,
    ]
    const uid = req.params.uid;
    await connection.query(sqlQuery, [...data, uid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Statue: true, Message: "user details updated successfully", result })
    })
}

////////////////  update user status active //////////////////
const updateStatusActive = async (req, res) => {
    const sqlQuery = "UPDATE tbl_admin_users SET status = 'active' where uid = ?"
    const uid = req.params.uid;
    console.log(uid)
    await connection.query(sqlQuery, [uid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "User Activate", result })
    })
}

/////////////////// update user status deactive  /////////////////////
const updateStatusDeactive = async (req, res) => {
    const sqlQuery = "UPDATE tbl_admin_users SET status = 'deactive' where uid = ?"
    const uid = req.params.uid;
    console.log(uid)
    await connection.query(sqlQuery, [uid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "User Deactivate", result })
    })
}

///////////==============  total users ======================///////////////////
const totalusers = async (req, res) => {
    const sqlQuery = "SELECT COUNT(uid) as totalusers FROM tbl_admin_users";
    await connection.query(sqlQuery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

///////==========  user details by params ===============///////////////
const userDetails = async (req, res) => {
    const sqlQuery = `SELECT * FROM tbl_admin_users WHERE uid = ?`;
    const uid = req.params.uid;
    console.log(uid)
    await connection.query(sqlQuery, [uid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result})
    })
}




module.exports = { addUsers, getUsers, updateUsers, updateStatusActive, updateStatusDeactive, totalusers, userDetails }