const app = require("./backend/app");
const port = process.env.PORT || 5000;
const dbConn = require("./backend/config/dbConn");
dbConn()
  .then(
    app.listen(port, (err) => {
      if (err) console.log(err);
      console.log(`server listening to port ${port}`);
    })
  )
  .catch((err) => {
    console.log("Something bad happened, oops!");
  });
