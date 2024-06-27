const { prisma } = require("../prisma/prisma-client.js");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязятельные поля" });
    }

    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    const isPasswordCorrect =
      user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Неверно введен логин или пароль" });
    }
  } catch {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  current,
};
