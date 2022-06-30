const { prisma } = require("@prisma/client"),
  colors = require("colors");
const app = require("./backend/app");
const port = process.env.PORT || 5000;
const { mongoDBConn, prismaConn } = require("./backend/config/dbConn");

prismaConn(
  mongoDBConn()
    .then(
      app.listen(port, (err) => {
        if (err) console.log(err);
        console.log(`server listening to port ${port}`);
      })
    )
    .catch((err) => {
      console.log("Something bad happened, oops!");
    })
);
