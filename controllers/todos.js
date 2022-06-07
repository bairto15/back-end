const Todos = require("../models/Todos");

var autorization = false;

module.exports.getTodos = async function (req, res) {
  const size = await Todos.find();
  if (req.body.sort === "name") {
    const todos = await Todos.find().sort({ name: 1 });
    return res.status(200).json({
      state: todos.slice(req.body.page * 3, req.body.page * 3 + 3),
      size: size.length,
    });
  } else if (req.body.sort === "name_minus") {
    const todos = await Todos.find().sort({ name: -1 });
    return res.status(200).json({
      state: todos.slice(req.body.page * 3, req.body.page * 3 + 3),
      size: size.length,
    });
  } else if (req.body.sort === "email") {
    const todos = await Todos.find().sort({ email: 1 });
    return res.status(200).json({
      state: todos.slice(req.body.page * 3, req.body.page * 3 + 3),
      size: size.length,
    });
  } else if (req.body.sort === "email_minus") {
    const todos = await Todos.find().sort({ email: -1 });
    return res.status(200).json({
      state: todos.slice(req.body.page * 3, req.body.page * 3 + 3),
      size: size.length,
    });
  } else if (req.body.sort === "status") {
    const todos = await Todos.find().sort({ status: 1 });
    return res.status(200).json({
      state: todos.slice(req.body.page * 3, req.body.page * 3 + 3),
      size: size.length,
    });
  } else if (req.body.sort === "status_minus") {
    const todos = await Todos.find().sort({ status: -1 });
    return res.status(200).json({
      state: todos.slice(req.body.page * 3, req.body.page * 3 + 3),
      size: size.length,
    });
  } else {
    const todos = await Todos.find().limit(3);
    return res.status(200).json({
      state: todos,
      size: size.length,
    });
  }
};

module.exports.saveTodos = async function (req, res) {
  if (!autorization) {
    return res.status(200).json({ message: "Требуется авторизация" });
  }
  if (req.body) {
    for (const item of req.body) {
      const candidate = await Todos.findOne({ id: item.id });
      if (candidate) {
        candidate.name = item.name;
        candidate.email = item.email;
        if (item.text && candidate.text != item.text) {
          candidate.edit = true;
        }
        candidate.text = item.text;
        candidate.status = item.status;
        try {
          await candidate.save();
        } catch (e) {
          console.log(e);
        }
      } else {
        const todo = new Todos({
          id: item.id,
          name: item.name,
          email: item.email,
          text: item.text,
          edit: item.edit,
          status: item.status,
        });
        try {
          await todo.save();
        } catch (e) {
          console.log(e);
        }
      }
    }
    return res.status(200).json({ message: "Задачи успено сохранены" });
  } else {
    return res.status(200).json({ message: "Ошибка сохранении" });
  }
};

module.exports.auth = async function (req, res) {
  if (req.body.login === "admin" && req.body.password === "123") {
    const todos = await Todos.find();
    autorization = !req.body.auth;
    return res.status(200).json({ auth: !req.body.auth, state: todos });
  } else {
    return res.status(200).json({ message: "Не правильно логин и пароль" });
  }
};
