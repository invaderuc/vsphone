const express = require("express");
const connectDB = require("./database");
//const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerConfig = require("./documentation/swagger.config.json");
const swaggerJSDoc = require("swagger-jsdoc");

// app middleware express
const app = express();

// db
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

const swaggerJsdocs = swaggerJsdoc(swaggerConfig);
app.use("/api/docs",swaggerUI.serve, swaggerUI.setup(swaggerJsdocs, {explorer:true}) );

app.use(cors());
console.log(readdirSync("./routes"));



readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));