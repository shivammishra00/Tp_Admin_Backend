const connection = require('../../Model/dbConnect');

////////=========  add offer =================///////////////
const addOffer = async (req, res) => {
    console.log(req.body)
    const sqlQuery = `INSERT INTO tbl_admin_offer(offerid, offername, perdiscount, flatdis, uptodis, validfrom, validto, subcatid,termscondition) VALUES(?)`;
    const data = [
        req.body.offerid,
        req.body.offername,
        req.body.perdiscount,
        req.body.flatdis,
        req.body.uptodis,
        req.body.validfrom,
        req.body.validto,
        req.body.subcatid,
        req.body.termscondition,
    ]
    await connection.query(sqlQuery, [data], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Offer added successfully", result })
    })
}

////////=========  view offer =================///////////////
const viewOffer = async (req, res) => {
    const sqlQuery = `SELECT su.subcatname, su.subcatid, of.offerid, of.offername, of.perdiscount, of.flatdis, of.uptodis, of.validfrom, of.validto, of.termscondition, of.status FROM tbl_admin_subcategory su JOIN tbl_admin_offer of ON su.subcatid = of.subcatid`;

    await connection.query(sqlQuery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

////////=========  update offer =================///////////////
const updateOffer = async (req, res) => {
    const sqlQuery = `UPDATE tbl_admin_offer SET offername = ?, perdiscount = ?, flatdis = ?, uptodis = ?, validfrom = ?, validto = ?, subcatid =?, termscondition = ? WHERE offerid = ?`;

    const offerid = req.params.offerid;
    const data = [
        req.body.offername,
        req.body.perdiscount,
        req.body.flatdis,
        req.body.uptodis,
        req.body.validfrom,
        req.body.validto,
        req.body.subcatid,
        req.body.termscondition,
    ]

    await connection.query(sqlQuery, [...data, offerid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Offer Updated Successfully", result })
    })
}


/////////=========== update Status active ===================////////////
const updateStatusActive = async (req, res) => {
    const sqlQuery = `UPDATE tbl_admin_offer SET status='active' WHERE offerid = ?`;
    const offerid = req.params.offerid;
    await connection.query(sqlQuery, [offerid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Offer Activated", result })
    })
}


///////===========  update Status Deactive  =================///////////////
const updateStatusDeactive = async (req, res) => {
    const sqlQuery = `UPDATE tbl_admin_offer SET status='deactive' WHERE offerid = ?`;
    const offerid = req.params.offerid;
    await connection.query(sqlQuery, [offerid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "Offer Deactivated", result })
    })
}

module.exports = { addOffer, viewOffer, updateOffer, updateStatusActive, updateStatusDeactive }