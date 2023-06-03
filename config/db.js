const mongoose = require('mongoose');
const colors = require('colors');
module.exports = {
  connectDB: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log(
        `Mongodb connected ${mongoose.connection.host}`.bgGreen.white
      );
    } catch (error) {
      console.log(`Mongodb Server Issue ${error}`.bgRed.white);
    }
  },
};

// connectDB: () => {
//   mongoose
//     .connect(process.env.MONGO_URL)
//     .then((result) => {
//       console.log(`Connected successfully`);
//     })
//     .catch((error) => {
//       console.log(`Error while connecting to database ${error}`);
//     });
// },