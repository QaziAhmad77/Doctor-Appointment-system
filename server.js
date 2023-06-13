const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');  //connect frontend backend
const { connectDB } = require('./config/db');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const doctorRouter = require('./routes/doctorRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
dotenv.config();
connectDB();
const port = process.env.PORT || 4000;

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow);
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

// delete update and insert entries from mongoshell

// 1. open cmd
// 2. write mongosh
// 3. show databases
// 4. use doctorapp
// 5. db.users.drop(); // this will delete whole entries


// db.users.insertOne({
//     name: "1",
//     email: "u@gmail.com",
//     password: "123",
//     isAdmin: false,
//     isDoctor: false,
//     notification: [],
//     seennotification: [],
// })

// db.users.findOne({_id:ObjectId("64876816b63161ecdef6756f")})

//  db.collectionName.deleteOne({ _id: ObjectId("64876816b63161ecdef6756f") })


// db.users.updateOne(
//     { _id: ObjectId("6487680bb63161ecdef6756c") }, 
//     {
//         $set: {
//             name: "Updated Name",
//         }
//     }
// )
