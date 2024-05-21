const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Set maximum listeners globally
EventEmitter.defaultMaxListeners = 15;

// Alternatively, set maximum listeners for a specific instance
myEmitter.setMaxListeners(15);

/////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookiParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
app.use(cors({         // cookie store ke liye ..
    origin: ["http://localhost:3000"],  // frontend url
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  // all method 
    credentials: true
}))
app.use(cookiParser());


const adminRouter = require('./Route/adminRoutes/adminRoute.js')
const categoryRouter = require('./Route/categoryRoutes/categoryRoutes.js')
const userRouter = require('./Route/userRoutes/userRoutes.js')
const rolesRouter = require('./Route/rolesRoute/rolesRoute.js')
const roleAssigneRouter = require('./Route/rolesRoute/roleAssignRoute.js')
const subCatRouter = require('./Route/subCategoryRoutes/subCategoryRoutes')
const offerRouter = require('./Route/offerRoute/offerRoute.js')
const userLoginRouter = require('./Route/userRoutes/userLoginRoute.js')
const verifyRouter = require('./Route/VerifyRoute/verifyRoute.js')
app.use("/auth", adminRouter)
app.use("/api/admin/category", categoryRouter)
app.use("/api/admin/users", userRouter)
app.use("/api/admin/roles", rolesRouter)
app.use("/api/admin/roleassign",roleAssigneRouter)
app.use("/api/admin/subcategory",subCatRouter)
app.use("/api/admin/offer", offerRouter)
app.use("/api/admin/users",userLoginRouter)
app.use("/api/allverify", verifyRouter)


const port = process.env.PORT;


app.listen(port, ()=>{
    console.log(`server is running on ${port} port`)
})