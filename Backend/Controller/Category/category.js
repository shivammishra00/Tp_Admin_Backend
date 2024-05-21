const connection = require('../../Model/dbConnect');

/////  add category  ////////
const addCategory = async (req,res) =>{
    console.log(req.body)
    const sqlQuery = "INSERT INTO tbl_admin_product_category (cid,cname) values (?)";
    const data = [req.body.cid,  req.body.cname]
    await connection.query(sqlQuery, [data], (err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, Message: "category added successfully" ,result })
    })
}

/////// show category   ///////
const showCategory = async (req,res) =>{
    const sqlQuery = "SELECT * FROM tbl_admin_product_category ORDER BY cid ASC";
    await connection.query(sqlQuery, (err,result)=>{
        if(err) return res.json({Status: false, Error:"Query error", error: err.sqlMessage})
        else return res.json({Status: true, result })
    })
}

/////  update category  /////
const updateCategory = async (req,res)=>{
    console.log(req.body)
    const sqlQuery = "UPDATE tbl_admin_product_category SET cname = ? WHERE cid = ? ";
    const cname = req.body.cname;
    const cid = req.params.cid;
    await connection.query(sqlQuery, [cname, cid], (err,result)=>{
        if (err) return res.json({Status: false,  Error:"Query error", error: err.sqlMessage})
        else return res.json({Status: true, Message:"Data updated successfully" ,result})
    })
}

//////////===========  product category total =================//////////////
const totalCategory = async (req,res)=>{
    const sqlQuery = "SELECT COUNT(cid) as totalcategory FROM tbl_admin_product_category";
    await connection.query(sqlQuery, (err, result)=>{
        if(err) return res.json({Status: false, Error: "Query error", error: err.sqlMessage})
        else return res.json({Status: true, result})
    })
}




module.exports = {addCategory, showCategory, updateCategory, totalCategory}