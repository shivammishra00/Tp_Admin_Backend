const express = require('express');
const roleAssigneRouter = express.Router();

const {roleAssigne, checkRole, deleteRole} = require('../../Controller/Roles/roleAssign')

roleAssigneRouter.post("/grantrole", roleAssigne)
roleAssigneRouter.get("/checkrole/:uid", checkRole)
roleAssigneRouter.delete("/revokrole/:uid/:roleid", deleteRole)


module.exports = roleAssigneRouter