const adminLogout = (req, res) =>{
    res.clearCookie('token')
    return res.json({Status: true})
}

module.exports = {adminLogout}