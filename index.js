const app = require("./backend/app");
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`server listening to port ${port}`);
});
