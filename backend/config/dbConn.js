const mongoose = require("mongoose"),
  { PrismaClient } = require("@prisma/client");
const mongoDBConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully".cyan);
  } catch (err) {
    console.log("Can not connect to database with this URI".red);
    console.log(err.message);
    process.exit();
  }
  // return mongoose.connect(process.env.MONGO_DB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
};
const prismaConn = async () => {
  await prisma
    .$connect()
    .then(() => {
      console.log("MySQL with Prisma connected".cyan);
    })
    .catch((error) => {
      console.log("MySQL with Prisma not connected".red);
      console.log("Exiting".red);
      process.exit();
    });
};
const prisma = new PrismaClient();
module.exports = {
  mongoDBConn,
  prisma,
  prismaConn,
};
