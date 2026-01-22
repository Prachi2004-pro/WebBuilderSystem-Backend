require("dotenv").config(); //load environment variables from .env file
const express = require("express");
const app = express(); //server application object
const userRouter = require("./Routes/userRoutes");
const templateRouter = require("./Routes/TemplateRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
)); 

const connectDB = require("./dbConnect");
const Port = process.env.PORT;
connectDB(); //connect to database


// Middleware to log HTTP method and URL of each request(sequrity Guard)
app.use((req, res, next)=>{
    console.log("HTTP Method:" + req.method + " URL:" + req.url);
    next();
});
// console.log("TEST KEY:", process.env.CLOUDINARY_API_KEY);

app.use(express.json()); //middleware to parse JSON request bodies

app.use("/users", userRouter);
app.use("/template", templateRouter);

app.get("/", (req, res) => {
    res.json({
        message: "API is running....",
        version: "1.0.0",
        status: 'Running'
    });
});

app.listen(Port, () => {
    console.log('Server is running on port:', Port);
});