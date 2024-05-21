const express = require('express');
const rolesRouter = express.Router();

const {addRoles, showRoles, updateRoles} = require('../../Controller/Roles/role')

rolesRouter.post("/add_roles", addRoles)
rolesRouter.get("/show_roles", showRoles)
rolesRouter.patch("/edit_roles/:roleid", updateRoles)

module.exports = rolesRouter