const mongoose = require("mongoose"),
  { PrismaClient } = require("@prisma/client");
const mongoDBConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Can not connect to database with this URI");
    console.log(err.message);
    process.exit(1);
  }
  // return mongoose.connect(process.env.MONGO_DB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
};
const prismaConn = async () => {
  // try {
  //   await prisma.$connect();
  //   console.log("Prisma Connected");
  // } catch (error) {
  //   console.log(`Cannot be connected: ${error.message}`);
  // }
  return prisma.$connect();
};
const prisma = new PrismaClient();
module.exports = {
  mongoDBConn,
  prisma,
  prismaConn,
};
