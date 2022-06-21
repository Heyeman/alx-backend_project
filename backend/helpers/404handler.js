module.exports = (req, res) => {
  res.status(404).send("The specified route can't be found");
};
