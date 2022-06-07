const Todos = require("../models/Todos");

module.exports.auth = async function (req, res) {
  if (req.body.login === "admin" && req.body.password === "123") {
    const todos = await Todos.find();
    return res.status(200).json({ auth: !req.body.auth, state: todos });
  } else {
    return res.status(200).json({ message: "Не правильно логин и пароль" });
  }
};
