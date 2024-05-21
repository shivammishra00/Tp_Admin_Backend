

const user = (req,res) =>{
  return res.json({Status:true, role:req.role, uid: req.uid, name:req.name})
}

module.exports = {user}






