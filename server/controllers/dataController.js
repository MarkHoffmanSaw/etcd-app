const client = require("../db");

exports.getData = async (req, res, next) => {
  const data = await client.getAll();

  // console.log(data);

  res.status(200).json({
    status: "ok",
    data,
  });
};
