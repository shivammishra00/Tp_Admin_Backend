const connection = require('../../Model/dbConnect');

const addRoles = async (req, res) => {
    console.log(req.body)
    const data = {
        roleid: req.body.roleid,
        rolename: req.body.rolename
    }
    const sqlQuery = "INSERT INTO tbl_admin_roles SET ?"
    await connection.query(sqlQuery, [data], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Role add successfully", result })
    })
}

const showRoles = async (req, res) => {
    const sqlQuery = "SELECT roleid,rolename FROM tbl_admin_roles ORDER BY roleid ASC";
    await connection.query(sqlQuery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const updateRoles = async (req, res) => {
    console.log(req.body)
    const sqlQuery = "UPDATE tbl_admin_roles SET rolename = ? WHERE roleid = ?"
    const { rolename } = req.body
    const roleid = req.params.roleid;
    await connection.query(sqlQuery, [rolename, roleid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Role Update Successfully", result })
    })

}

module.exports = { addRoles, showRoles, updateRoles }

