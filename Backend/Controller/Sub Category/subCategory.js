const connection = require('../../Model/dbConnect');

const addSubCategory = async (req, res) => {
    const sqlQuery = `INSERT INTO tbl_admin_subcategory (cid, subcatid, subcatname, image) VALUES (?)`;
    const data = [
        req.body.cid,
        req.body.subcatid,
        req.body.subcatname,
        req.file.location
    ]
    console.log(data)
    await connection.query(sqlQuery, [data], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Sub Category Added Successfully", result })
    })
}

const viewSubCategory = async (req, res) => {
    try {
        const sqlQuery = `SELECT pc.cname AS cname, sc.cid, sc.subcatid, sc.subcatname, sc.image, sc.addedon FROM tbl_admin_subcategory sc INNER JOIN tbl_admin_product_category pc ON sc.cid  = pc.cid;`;
        await connection.query(sqlQuery, (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
            else return res.json({ Status: true, result })
        })
    } catch (err) {
        console.log(err)
    }
}

const updateSubCategory = async (req, res) => {
    const sqlQuery = `UPDATE tbl_admin_subcategory SET image = ? WHERE subcatid = ?`;
    const subcatid = req.params.subcatid;
    const data = [
        req.file.location
    ];
    await connection.query(sqlQuery, [...data, subcatid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Sub Category Updated Successfully", result })
    })

}

const deleteSubCategory = async (req, res) => {
    const subcatid = req.params.subcatid;
    const sqlQuery = `DELETE FROM tbl_admin_subcategory WHERE subcatid = ?`
    await connection.query(sqlQuery, [subcatid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Sub Category Deleted Successfully", result })
    })
}


//////////===========  product total category =================//////////////
const totalSubCategory = async (req, res) => {
    const sqlQuery = `SELECT COUNT(subcatid) as totalsubcategory FROM tbl_admin_subcategory`;
    await connection.query(sqlQuery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}


module.exports = { addSubCategory, viewSubCategory, updateSubCategory, deleteSubCategory, totalSubCategory }