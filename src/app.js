const express = require("express");

//Here we import the routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const createAdminAccount = require("./script/addAdminUser");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/auth",loginRoute);
app.use("/user",signupRoute);

app.use("/api",userRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on: http://localhost:${PORT}`);
});