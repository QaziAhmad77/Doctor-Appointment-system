const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const {connectDB} = require('./config/db');
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
dotenv.config();
connectDB();
const port = process.env.PORT || 4000;

app.use("/api/user",userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow);
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});
