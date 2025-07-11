require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth-routes");
const fileRouter = require("./routes/file-routes");
const trainRouter = require("./routes/train-routes")
const fileUpload = require("express-fileupload")
const cookieParser = require('cookie-parser')
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(fileUpload({}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.static('./static'))
app.use(cookieParser())
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);
app.use('api/train', trainRouter)


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB connected'))

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
