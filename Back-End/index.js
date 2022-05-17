const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Route Objects
var user = require("./routes/userRoutes")

//Router Configuration
app.use("/user",user)

app.listen(port, () => {
  console.log(`Serve live at http://localhost:${port}`);
});