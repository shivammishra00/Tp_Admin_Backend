const connection = require('../../Model/dbConnect');

const roleAssigne = async (req, res) => {
    console.log(req.body)
    const sqlQuery = "INSERT INTO tbl_admin_role_assign SET ?";
    const data = {
        uid: req.body.uid,
        roleid: req.body.roleid
    }
    console.log(data)
    await connection.query(sqlQuery, [data], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Role Assign Successfully", result })
    })
}

////////========  Check Assign Role ==============////////////
const checkRole = (req, res) => {
    const uid = req.params.uid;
    const sqlQuery = `SELECT roleid, rolename from tbl_admin_roles WHERE roleid IN (SELECT roleid FROM tbl_admin_role_assign WHERE uid = ? )`
    connection.query(sqlQuery, [uid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}


const deleteRole = (req, res) => {
    const uid = req.params.uid;
    const roleid = req.params.roleid;
    // console.log(uid)
    // console.log(roleid)
    const sqlQuery = 'DELETE FROM tbl_admin_role_assign WHERE uid = ? AND roleid = ?';
    connection.query(sqlQuery,[uid,roleid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Role Deleted Successfully", result })
    })
}





module.exports = { roleAssigne, checkRole, deleteRole }